# backend/api/product_optimize_routes_assis.py

from flask import Blueprint, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

product_optimize_routes_assis = Blueprint('product_optimize_routes_assis', __name__)

@product_optimize_routes_assis.route('/product_optimize_assis', methods=['POST'])
def optimize_product():
    return "Hello"
    
   

