# backend/api/product_optimize_routes_assis.py

from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv
# from assistant.openAI_assistant import EcofactorAssistant
load_dotenv()

# assistant = EcofactorAssistant()

product_optimize_routes_assis = Blueprint('product_optimize_routes_assis', __name__)

# @product_optimize_routes_assis.route('/', methods=['POST'])
# def query_the():
    
#     return "Hello"

