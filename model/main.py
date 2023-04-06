from flask import Flask, jsonify, request, json, session, redirect
from flask_restful import Api, Resource
import psycopg2
import yaml

with open('secured.yaml', 'r') as file:
    secured_data = yaml.load(file, Loader=yaml.FullLoader)

app = Flask(__name__)
api  = Api(app)

conn = psycopg2.connect(
    host=secured_data['db_host'],
    port=secured_data['db_port'],
    dbname=secured_data['db_name'],
    user=secured_data['db_user'],
    password=secured_data['db_password']
)

if conn.status == psycopg2.extensions.STATUS_READY:
    print("Connection is ready.")
else:
    print("Connection is not ready.")

conn.close()

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


api.add_resource(TestGetData,"/testgetdata")
api.add_resource(TestPostData,"/testpostdata")

if __name__ == "__main__":
    app.run(debug=True)