# backend/api/product_optimize_routes.py

from flask import Blueprint, request, jsonify
from RAG.vectara_RAG import VectaraRAG
import os
from utils.file_utils import *
from dotenv import load_dotenv

load_dotenv()
# corpus_id = os.getenv("VECTARA_CORPUS_ID")

rag = VectaraRAG()
product_optimize_routes = Blueprint('product_optimize_routes', __name__)

@product_optimize_routes.route('/product_optimize', methods=['POST'])
def optimize_product():
    
    description = request.json.get('query')
    contents = request.json.get('contents')
    # corpus_id = request.json.get('corpus_id')
    # print(corpus_id)
    # print(contents)
    print("Description: " , description)
    # summary = rag.query_vectara(corpus_id, description, 3, "en")
    # print("Vectara response: ",summary)
    # response = rag.ask_question_with_summary(summary, description)
    response = rag.ask_question_with_summary(contents, description)
    print("LLM response: ", response)
    
    return response , 200

@product_optimize_routes.route('/upload_file', methods=['POST'])
def upload():
    corpus_id = request.form['corpus_id']
    print(corpus_id)
    file_path = upload_file()
    contents = read_file_contents(file_path)
    # print(contents)
    # rag.upload_data(corpus_id, file_path)
    # delete_temp_file(file_path)
    # return "File Uploaded Successfully\n Now you can chat for the product optimization " + str(corpus_id)
    return contents
    

@product_optimize_routes.route('/create_corpus', methods=['GET'])
def create():
    
    corpus_name = "Ecofactor"
    corpus_id = rag.create_corpus(corpus_name)
    return str(corpus_id), 201

@product_optimize_routes.route('/delete_corpus', methods=['POST'])
def delete():
    
    corpus_id = request.json.get("corpus_id")
    print(corpus_id)
    res = rag.delete_corpus(corpus_id)
    return res
