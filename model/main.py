from flask import Flask, jsonify, request, json, session, redirect
from flask_restful import Api, Resource
from controller import get_ai_review, get_story, get_quizz
#from quizz import solve
# import psycopg2
import yaml
from flask_cors import CORS


with open('secured.yaml', 'r') as file:
    secured_data = yaml.load(file, Loader=yaml.FullLoader)

app = Flask(__name__)
cors = CORS(app)
api  = Api(app)


# conn = psycopg2.connect(
#     host=secured_data['db_host'],
#     port=secured_data['db_port'],
#     dbname=secured_data['db_name'],
#     user=secured_data['db_user'],
#     password=secured_data['db_password'] 
# )

# if conn.status == psycopg2.extensions.STATUS_READY:
#     print("Connection is ready.")
# else:
#     print("Connection is not ready.")

# conn.close()

# @cross_origin(origin='*')
class TestGetData(Resource): 
    def get(self):
        send_data = {"my_data":"TestGetData Working!"}
        return jsonify(send_data)

# @cross_origin(origin='*')
class TestPostData(Resource):
    def post(self):
        posted_data = json.loads(request.data)
        print(posted_data)
        send_data = {"my_data":"TestPostData Working!"}
        return jsonify(send_data)

# @cross_origin(origin='*')
class GetAIReview(Resource):
    def post(self):
        # print(request.data)
        posted_data = json.loads(request.data)
        # print(posted_data['data'][])
        ans = get_ai_review(posted_data['question'],posted_data['testCases'],posted_data['code'])
        ret_obj = {"review":ans}
        return jsonify(ret_obj)

# @cross_origin(origin='*')
class GetStory(Resource):
    def post(self):
        posted_data = json.loads(request.data)
        ans = get_story(posted_data['keyWord'])
        ret_obj = {"key_story":ans}
        return jsonify(ret_obj)

class GetQuizz(Resource):
    def post(self):
        posted_data = json.loads(request.data)
        ans = get_quizz(posted_data['content'])
        # ans = solve(posted_data['content'])
        ret_obj = {"questions":ans}
        return jsonify(ret_obj)


api.add_resource(TestGetData,"/api/model/testgetdata") # Testing the get route
api.add_resource(TestPostData,"/api/model/testpostdata") # Testing the post route
api.add_resource(GetAIReview,"/api/model/getaireview") # Posting the question json, this will give AI review
api.add_resource(GetStory,"/api/model/getstory") # Posting a particular key word and get use case story
api.add_resource(GetQuizz,"/api/model/getquizz") # Post the content get the quizz questions

if __name__ == "__main__":
    app.run(debug=True)