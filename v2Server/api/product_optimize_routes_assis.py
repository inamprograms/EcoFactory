# backend/api/product_optimize_routes_assis.py

from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv
from assistant.assistant import *
load_dotenv()


product_optimize_routes_assis = Blueprint('product_optimize_routes_assis', __name__)

@product_optimize_routes_assis.route('/create_thread', methods=['POST'])
def create_thread():
    file = request.form['file']
    return "Hello"

