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

request_body = {
    "model": "text-davinci-003",
    "prompt": "write a python script to perform binary search on an array",
    "max_tokens": 2000,
    "temperature": 0.5,
}

response = requests.post(api_endpoint, headers=request_header,json=request_body)

print(response)

if(response.status_code == 200):
    print(response.json()['choices'][0]['text'])