# backend/api/esg_guidelines_checker_routes.py

from flask import Blueprint, request, jsonify
from RAG.vectara_RAG import VectaraRAG
import os
from utils.file_utils import *
from dotenv import load_dotenv

load_dotenv()
corpus_id = os.getenv("VECTARA_CORPUS_ID")

rag = VectaraRAG()
esg_guidelines_checker_routes = Blueprint('esg_guidelines_checker_routes', __name__)

@esg_guidelines_checker_routes.route('/esg_guidelines', methods=['POST'])
def optimize_product():
    
    description = request.json.get('query')
    print(corpus_id)
    print("Description: " , description)
    summary = rag.query_vectara(corpus_id, description, 3, "en")
    print("Vectara response: ",summary)
    response = rag.ask_question_with_summary(summary, description)
    print("LLM response: ", response)
    
    return response , 200
