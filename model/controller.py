import requests
import yaml

with open('secured.yaml', 'r') as file:
    secured_data = yaml.load(file, Loader=yaml.FullLoader)

api_endpoint = secured_data['gpt_api_endpoint']
api_key = secured_data['gpt_api_key']

request_header = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "+api_key
}

def get_ai_review(question,testcases,answer):
    testcases_string = ""
    for i in range(len(testcases)):
        testcases_string += "TestCase"+str(i+1)+": "
        testcases_string += "Input: "
        testcases_string += testcases[i]['input']
        testcases_string += ", Output: "
        testcases_string += testcases[i]['output']
        testcases_string += ","

    print(question)
    print(testcases_string)
    print(answer)

    template = "For the question: "
    template += question
    template += "Which has the following testcases: "
    template += testcases_string
    template += "The code which I wrote is: "
    template += answer
    template += ". On a scale of 1 to 10 how much do you grade my code. "
    template += "Point out mistakes if any and give the correct code. Also wrap the code in <code>"

    # MIND THIS !!!!!!! --Remove after testing--
    # template = "For the question: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order. Which have the following testcases: TestCase1: Input: nums = [2,7,11,15], target = 9, Output: [0,1],TestCase2: Input: nums = [3,2,4], target = 6, Output: [1,2],TestCase3: Input: nums = [3,3], target = 6, Output: [0,1], The code which I wrote is: class Solution { public: vector<int> twoSum(vector<int>& nums, int target) {map<int,int> m; for(int i=0;i<nums.size();i--){ if(m.find(nums[i]) == m.end()){ m[target - nums[i]] = i;}else{return {m[nums[i]],i};}}return {-1,-1}; }};. On a scale of 1 to 10 how much do you grade my code. Point out mistakes if any and give the correct code. Wrape the code in <code>"

    print("The request template: ",template)

    request_body = {
    "model": "text-davinci-003",
    "prompt": template,
    "max_tokens": 2000,
    "temperature": 1, 
    }

    response = requests.post(api_endpoint, headers=request_header,json=request_body)
    print(response)

    ans = ""
    if(response.status_code == 200):
        ans = response.json()['choices'][0]['text']
        print(ans)

    ans = ans.split('\n\n', 1)[1]

    return ans


def get_story(key_word):
    print("Control Reached")
    template = "write a short really interesting story covering all the real world applications of "+key_word

    request_body = {
    "model": "text-davinci-003",
    "prompt": template,
    "max_tokens": 2000,
    "temperature": 1, 
    }

    response = requests.post(api_endpoint, headers=request_header,json=request_body)
    print(response)

    ans = ""
    if(response.status_code == 200):
        ans = response.json()['choices'][0]['text']
        print(ans)

    return ans

def get_quizz(content):
    template = content
    template += """
    . Generate 5 very multiple choice questions based on the above text, wrap each mcq in <dict>, and give the output in the following format:
    <dict>
    "Question": "What industries are taking advantage of cloud computing?",
    "Answer": "A",
    "A": "Organizations of every type, size, and industry.",
    "B": "Small businesses.",
    "C": "Large corporations.",
    "D": "Government agencies."
    </dict>
    """
    #template += ". Generate 5 very important multiple choice question and associated answers based on the above content."
    #template += "Generate 5 mcq questions with answers, based on the above text"
    request_body = {
    "model": "text-davinci-003",
    "prompt": template,
    "max_tokens": 2000,
    "temperature": 0, 
    }

    response = requests.post(api_endpoint, headers=request_header,json=request_body)
    print(response)

    ans = ""
    if(response.status_code == 200):
        ans = response.json()['choices'][0]['text']

    print(ans)

    text = ans
    l = text.split('\n')
    mcq=[]
    l1 = []
    for content in l:
        temp = content
        cleaned_text = content.strip()
        #print(cleaned_text)
        if(cleaned_text == '</dict>'):

            mcq.append(l1)
            l1=[]
            continue
        if(cleaned_text == '<dict>'):
            continue
        l1.append(cleaned_text)
    list_of_dict = []

    for i in mcq:
        d = convert_list_to_dict(i)
        list_of_dict.append(d)

    #print(list_of_dict)

    questions = []

    for rod in list_of_dict:
        dic = {}
        dic['question'] = rod['Question']
        # dic['Answer'] = rod['Answer']
        temp =rod['Answer']
        if 'A' in temp:
            dic['answer'] = rod['A']
        if 'B' in temp:
            dic['answer'] = rod['B']
        if 'C' in temp:
            dic['answer'] = rod['C']
        if 'D' in temp:
            dic['answer'] = rod['D']
        l=[]
        l.append(rod['A'])
        l.append(rod['B'])
        l.append(rod['C'])
        l.append(rod['D'])
        dic['options'] = l
        questions.append(dic)

    print(questions)
    return questions

def convert_list_to_dict(lst):
    dct = {}
    for i in range(len(lst)):
        if lst[i].startswith('"Question"'):
            dct['Question'] = lst[i].split(':')[1].strip().strip('"')
        elif lst[i].startswith('"Answer"'):
            dct['Answer'] = lst[i].split(':')[1].strip().strip('"')
        elif lst[i].startswith('"A"'):
            dct['A'] = lst[i].split(':')[1].strip().strip('"')
        elif lst[i].startswith('"B"'):
            dct['B'] = lst[i].split(':')[1].strip().strip('"')
        elif lst[i].startswith('"C"'):
            dct['C'] = lst[i].split(':')[1].strip().strip('"')
        elif lst[i].startswith('"D"'):
            dct['D'] = lst[i].split(':')[1].strip().strip('"')
    return dct

    
    # ans = ans.split('\n')

    return ans