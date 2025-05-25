from openai import OpenAI


def aiPost(content):
    # print(content)
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
    v=  response.choices[0].message.content.replace("```json", "").replace("```", "")
    print(v)
    return v

def budgetAssistance(budget, revenueTotal, expensesTotal):
    print(budget)
    print(revenueTotal)
    print(expensesTotal)
    return (
        aiPost(
            " Hi i have this ERP which is intergrated with you please provide a json answer to this question. i have this budget for my business i would like you to assist in refining it"
            + " and making it better which can help my business. Here is the budget"
            + str(budget)
        )
        + " and also here is my previous expenses totaled "
        + expensesTotal
        + " tzs and my revenues were "
        + revenueTotal + ".Please profivide your answer in json format for the refined budget suggestions with category,suggestion and amount fields in this format {'budget':[], 'recommendations':[]}. return only json format "
    )


def overallBusinessAssistance(budget, sales, expenses):
    return aiPost(
        " Hi i have this business i want you to analyse my income and expenses in relation "
        + "to my budget and suggest 5 imorovements that would grow the business. This is my current month budget "
        + budget
        + ". These were my sales "
        + sales
        + ". And these were my expenses"
        + str(expenses)
        + " and also here"
        + " Return a json list containing 5 improvements that should be done next month"
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
