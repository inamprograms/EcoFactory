from flask import Flask, jsonify, request 
from flask_cors import CORS, cross_origin
import os
from consts.prompts import ProductDescription
from rag_app import complete, retrieve, prompt_llm
from openai import OpenAI

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r'*': {'origins':'*'}})

client = OpenAI()

openai_api_key = os.getenv('OPENAI_API_KEY')

print("openai_api_key -> ", openai_api_key)

@cross_origin(origins='*')


@app.route("/")
def hello_world():
    return "<p>Hello, World</p>"


@app.route("/api/optimize", methods=['POST'])
def product_optimizer():
    
    try:
        query = request.json.get("query") 
        query = ProductDescription + query
        # print(query)
        query_with_contexts = retrieve(query)
        # print(query_with_contexts)
        
        bot = complete(query_with_contexts) 
        print(bot)
        return {"bot": bot}
    
    except ValueError as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500
    
    
    
    
@app.route("/api/advisor", methods=['POST'])
def esg_guidelines_advisor():
    
    try:
        query = request.json.get("query") 
        # query = ProductDescription + query
    
        query_with_contexts = retrieve(query)  
        bot = complete(query_with_contexts) 
        print(bot)
        
        return {"bot": bot}

    except ValueError as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500
    
    
    
    
    
@app.route("/api/eco_fac_gpt", methods=['POST'])
def gpt4():
    
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
    app.run(debug=False, host='0.0.0.0')