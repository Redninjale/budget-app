from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
import json
load_dotenv()

CAPITAL_ONE_API_KEY = os.getenv('CAPITAL_ONE_API_KEY')

def parse_json_to_dict(json_file):
    with open(json_file, 'r') as file:
        json_array = json.load(file)
    merchant = {}
    category = {}
    for item in json_array:
        merchant[item['name']] = item['id']
        if item["category"] in category:
            category[item["category"]].append(item['id'])
        else:
            category[item["category"]] = [item['id']]
    return merchant, category

merchant_id_data, category_data = parse_json_to_dict('output.json')

app = Flask(__name__)

@app.route("/")
def hello_world():
    return (
        "<p>Hello World</p>"
    )

# Accounts
@app.route('/accounts/<int:account_id>/purchases', methods=['GET'])
def get_purchases_by_account(account_id):
    month = request.args.get('month')
    year = request.args.get('year')
    
    response = requests.get(f'http://api.nessieisreal.com/accounts/{account_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchases'}), response.status_code
    
    purchases = response.json()
    if month or year:
        filtered_purchases = []
        for purchase in purchases:
            purchase_date = purchase['purchase_date']
            purchase_year, purchase_month, _ = purchase_date.split('-')
            
            if (not month or purchase_month == month) and (not year or purchase_year == year):
                filtered_purchases.append(purchase)
        return jsonify(filtered_purchases), 200
    
    return jsonify(purchases), 200

# Merchants
@app.route('/merchants/<int:merchant_id>/accounts/<int:account_id>/purchases', methods=['GET'])
def get_purchases_by_account_and_merchant(merchant_id, account_id):
    response = requests.get(f'http://api.nessieisreal.com/merchants/{merchant_id}/accounts/{account_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchases'}), response.status_code
    return jsonify(response.json()), 200

@app.route('/merchants/<int:merchant_id>/purchases', methods=['GET'])
def get_purchases_by_merchant(merchant_id):
    response = requests.get(f'http://api.nessieisreal.com/merchants/{merchant_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchases'}), response.status_code
    return jsonify(response.json()), 200

# Categories
@app.route('/categories/<string:category>/accounts/<int:account_id>/purchases', methods=['GET'])
def get_purchases_by_category(category, account_id):
    aggregate = 0
    for merchant_id in category_data[category]:
        response = requests.get(f'http://api.nessieisreal.com/merchants/{merchant_id}/accounts/{account_id}purchases?key=' + CAPITAL_ONE_API_KEY)
        if response.status_code != 200:
            return jsonify({'error': 'Failed to get purchases'}), response.status_code

    return jsonify(aggregate), 200

@app.route('/categories', methods=['GET'])
def get_categories():
    if category_data:
        print(category_data.keys())
        return jsonify(list(category_data.keys())), 200

@app.route('/categories/<string:category>/purchases', methods=['GET'])
def get_category_purchases(category):
    aggregate = 0
    month = request.args.get('month')
    year = request.args.get('year')
    
    for merchant_id in category_data[category]:
        response = requests.get(f'http://api.nessieisreal.com/merchants/{merchant_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
        if response.status_code != 200:
            return jsonify({'error': 'Failed to get purchases'}), response.status_code
        
        for purchase in response.json():
            purchase_date = purchase['purchase_date']
            purchase_year, purchase_month, _ = purchase_date.split('-')
            
            if (not month or purchase_month == month) and (not year or purchase_year == year):
                aggregate += purchase['amount']

    return jsonify(aggregate), 200

# Purchases
@app.route('/purchases/<int:purchase_id>', methods=['GET'])
def get_purchase_by_id(purchase_id):
    response = requests.get(f'http://api.nessieisreal.com/purchases/{purchase_id}?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchase'}), response.status_code
    return jsonify(response.json()), 200


if __name__ == '__main__':
    
    app.run(debug=True)