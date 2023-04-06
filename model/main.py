from flask import Flask, jsonify, request, json, session, redirect
from flask_restful import Api, Resource
from controller import get_ai_review
import psycopg2
import yaml

with open('secured.yaml', 'r') as file:
    secured_data = yaml.load(file, Loader=yaml.FullLoader)

app = Flask(__name__)
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

class TestGetData(Resource): 
    def get(self):
        send_data = {"my_data":"TestGetData Working!"}
        return jsonify(send_data)

class TestPostData(Resource):
    def post(self):
        posted_data = json.loads(request.data)
        print(posted_data)
        send_data = {"my_data":"TestPostData Working!"}
        return jsonify(send_data)

class GetAIReview(Resource):
    def post(self):
        posted_data = json.loads(request.data)
        ans = get_ai_review(posted_data['question'],posted_data['testCases'],posted_data['studentAnswer'])
        ret_obj = {"review":ans}
        return ret_obj


api.add_resource(TestGetData,"/api/model/testgetdata") # Testing the get route
api.add_resource(TestPostData,"/api/model/testpostdata") # Testing the post route
api.add_resource(GetAIReview,"/api/model/getaireview") # Posing the question json, this will give AI review 

if __name__ == "__main__":
    app.run(debug=True)