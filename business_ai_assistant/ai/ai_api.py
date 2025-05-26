from openai import OpenAI
import regex
import json


def aiPost(content):
    print(content)
    # return content
    client = OpenAI(
        api_key="sk-de07a81c164747aa87ed11f82cd062fb",
        base_url="https://api.deepseek.com",
    )
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "user", "content": content},
        ],
        stream=False,
    )
    v = response.choices[0].message.content.replace("```json", "").replace("```", "")
    v = extract_json(v)
    data = []
    for i in v:
        data = i
    print(data)
    return v


def budgetAssistance(budget, revenueTotal, expensesTotal):
    print(budget)
    print(revenueTotal)
    print(expensesTotal)
    return aiPost(
        " Hi i have this ERP which is intergrated with you please provide a json answer to this question. i have this budget for my business i would like you to assist in refining it"
        + " and making it better which can help my business. Here is the budget"
        + str(budget)
        + " and also here is my previous expenses totaled "
        + str(expensesTotal)
        + " Tzs and my revenues were "
        + str(revenueTotal)
        + "TZS .Strictly provide the response in json format in this format { recommendations: [{ suggestion: string,amount: number,title: string }] }."
    )


def overallBusinessAssistance(budget, sales, expenses):
    return aiPost(
        " Hi i have this business i want you to analyse my income and expenses in relation "
        + "to my budget and suggest 5 imorovements that would grow the business. This is my current month budget "
        + budget
        + ". These were my sales "
        + str(sales)
        + ". And these were my expenses"
        + str(expenses)
        + "  list containing 5 improvements that should be done next month"
        + " Return the response in json format of { suggestions: [{ description:''. title:''}] } "
    )


def mentorMatching(criteria, mentors):
    return aiPost(
        "Hello i want you to help me find the best mentor for my business"
        + ", i have certain criterias that i want my mentor to have, so find the best"
        + " available mentor using these criterias and return the mentor id and score here"
        + " are my criterias, "
        + criteria
        + ". Here are mentor profiles "
        + mentors
        + ""
        + ". Please return a only a json list of mentor_id, reason for selecting the mentor and score of each mentor. just json with no explanations"
    )


def parseJSON(text):
    pattern = r"(\{(?:[^{}]|(?1))*\})"

    matches = regex.findall(pattern, text)

    # Try to parse and extract valid JSON
    json_objects = []
    for match in matches:
        try:
            json_objects.append(json.loads(match))
        except json.JSONDecodeError:
            pass  # skip invalid JSON


def RawJSONDecoder(index):
    class _RawJSONDecoder(json.JSONDecoder):
        end = None

        def decode(self, s, *_):
            data, self.__class__.end = self.raw_decode(s, index)
            return data

    return _RawJSONDecoder


def extract_json(s, index=0):
    results = []
    while (index := s.find("{", index)) != -1:
        try:
            decoder = RawJSONDecoder(index)
            obj = json.loads(s, cls=decoder)
            end = decoder.end
            results.append(s[index:end])
            index = end
        except json.JSONDecodeError:
            index += 1
    return results
