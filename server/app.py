from flask import Flask, jsonify, request 
from flask_cors import CORS, cross_origin
import os
from openai import OpenAI

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r'*': {'origins':'*'}})

client = OpenAI()
openai_api_key = os.getenv('OPENAI_API_KEY')

@cross_origin(origins='*')


@app.route("/")
def hello_world():
    return "<p>Hello, World</p>"


@app.route("/api/optimize", methods=['POST'])
def product_optimize():
    
    try:
        query = request.json.get("query") 
        response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "user", "content": query}]
        )
        print(response.choices[0].message.content)
        return response.choices[0].message.content
    
    except ValueError as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500
    
    
@app.route("/api/esg_guidelines", methods=['POST'])
def esg_guidelines_checker():
    
    try:
        query = request.json.get("query") 
        response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={ "type": "json_object" },
        messages=[
            {"role": "user", "content": query}]
        )
        print(response.choices[0].message.content)
        return response.choices[0].message.content
    
    except ValueError as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500
        


if __name__ == '__main__':
    app.run(debug=True)