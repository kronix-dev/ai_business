from openai import OpenAI



def aiPost(content):
    # print(content)
    return content
    client = OpenAI(api_key='sk-de07a81c164747aa87ed11f82cd062fb', base_url='https://api.deepseek.com')
    response = client.chat.completions.create(
    model='deepseek-chat',
    messages=[
        {'role': 'user', 'content': content},
    ],
    stream=False)
    return response


def budgetAssistance(budget):
    aiPost(' i have this budget for my business i would like you to assist in refining it and making it better which can help my business grow i have it in json format, also give me a json response. Here is the json '+str(budget))
    
def mentorMatching(criteria, mentors):
    return aiPost('Hello i want you to help me find the best mentor for my business'+
           ', i have certain criterias that i want my mentor to have, so find the best'+
           ' available mentor using these criterias and return the mentor id and score here'+
           ' are my criterias, '+str(criteria)+'. Here are mentor profiles ' + str(mentors) +''+
           '. Please return a only a json list of mentor_id, reason for selecting the mentor and score of each mentor. just json with no explanations'
)