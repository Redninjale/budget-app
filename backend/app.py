from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
import json
from db import create_goal, update_goal, delete_goal, read_goal, get_all
from model.mistral_model import make_inference
from flask_cors import CORS
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
CORS(app)


@app.route("/api/")
def hello_world():
    return (
        "<p>Hello World</p>"
    )

# Accounts
@app.route('/api/accounts/<int:account_id>/purchases', methods=['GET'])
def get_purchases_by_account(account_id):
    account_id="67956cfc9683f20dd518b9d7"
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
@app.route('/api/merchants/<int:merchant_id>/accounts/<int:account_id>/purchases', methods=['GET'])
def get_purchases_by_account_and_merchant(merchant_id, account_id):
    account_id="67956cfc9683f20dd518b9d7"
    response = requests.get(f'http://api.nessieisreal.com/merchants/{merchant_id}/accounts/{account_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchases'}), response.status_code
    return jsonify(response.json()), 200

@app.route('/api/merchants/<int:merchant_id>/purchases', methods=['GET'])
def get_purchases_by_merchant(merchant_id):
    response = requests.get(f'http://api.nessieisreal.com/merchants/{merchant_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchases'}), response.status_code
    return jsonify(response.json()), 200

# Categories
@app.route('/api/categories/<string:category>/accounts/<int:account_id>/purchases', methods=['GET'])
def get_purchases_by_category(category, account_id):
    account_id="67956cfc9683f20dd518b9d7"
    aggregate = 0
    transactions = []
    month = request.args.get('month')
    year = request.args.get('year')
    
    for merchant_id in category_data[category]:
        response = requests.get(f'http://api.nessieisreal.com/merchants/{merchant_id}/accounts/{account_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
        if response.status_code != 200:
            return jsonify({'error': 'Failed to get purchases'}), response.status_code
        
        for purchase in response.json():
            purchase_date = purchase['purchase_date']
            purchase_year, purchase_month, _ = purchase_date.split('-')
            
            if (not month or purchase_month == month) and (not year or purchase_year == year):
                aggregate += purchase['amount']
                transactions.append(purchase)

    return jsonify({'aggregate': aggregate, 'transactions': transactions}), 200

@app.route('/api/categories', methods=['GET'])
def get_categories():
    if category_data:
        print(category_data.keys())
        return jsonify(list(category_data.keys())), 200

@app.route('/api/categories/<string:category>/purchases', methods=['GET'])
def get_category_purchases(category):
    aggregate = 0
    transactions = []
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
                transactions.append(purchase)

    return jsonify({'aggregate': aggregate, 'transactions': transactions}), 200

# Purchases
@app.route('/api/purchases/<int:purchase_id>', methods=['GET'])
def get_purchase_by_id(purchase_id):
    print(purchase_id)
    response = requests.get(f'http://api.nessieisreal.com/accounts/{purchase_id}/purchases/?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchase'}), response.status_code
    return jsonify(response.json()), 200

# Goals
@app.route('/api/goals', methods=['POST'])
def create_new_goal():
    data = request.json
    goal_id = create_goal(data['goal_name'], data['time_limit'], data['goal_amount'], data['reward'])
    return jsonify({'goal_id': goal_id}), 201

@app.route('/api/goals/<int:goal_id>', methods=['PUT'])
def update_existing_goal(goal_id):
    data = request.json
    update_goal(goal_id, data)
    return jsonify({'message': 'Goal updated successfully'}), 200

@app.route('/api/goals/<int:goal_id>', methods=['DELETE'])
def delete_existing_goal(goal_id):
    delete_goal(goal_id)
    return jsonify({'message': 'Goal deleted successfully'}), 200

@app.route('/api/goals/<int:goal_id>', methods=['GET'])
def get_goal_by_id(goal_id):
    goal = read_goal(goal_id)
    if goal:
        return jsonify(goal), 200
    else:
        return jsonify({'error': 'Goal not found'}), 404

@app.route('/api/goals', methods=['GET'])
def get_all_goals():
    goals = get_all()
    return jsonify(goals), 200

@app.route("/api/mistral", methods=["GET"])
def get_mistral_model():
    body = request.json["body"]
    return jsonify(make_inference(body))

@app.route("/api/mistral/daily", methods=["GET"])
def get_mitral_daily():
    account_id="67956cfc9683f20dd518b9d7"
    month = request.args.get('month')
    year = request.args.get('year')
    
    body = '''
    Important: All things are pet-related purchases, so focus on how much they're spending with categories of Food & Drinks, 
    House & Utilities, Shopping, Personal, or Subscriptions. DONT MENTION PET-RELATED PURCHASES. USE THE 5 CATEGORIES I MENTIONED
    Make sure to RANDOMIZE your categories AND DO IT BASED ON THE DATA. Don't give the same task everytime.
    
    Based on the data I give you, focus on daily, weekly, and monthly costs. I want a daily task to reduce their spending habit.
    Make it 1 sentence long and make it concise like "spend under $30 today on Food & Drinks" or "eat out 2 times today". These must be simple to complete.
    The next few lines are the data. Only return 1 sentence max 10 words. Don't give your commentary. Each transaction has a schema of
    
    {
        "_id": "id",
        "amount": amount spent,
        "description": Where they purchase it at,
        "medium": "balance",
        "merchant_id": ignore this,
        "payer_id": "67956cfc9683f20dd518b9d7",
        "purchase_date": "2024-01-23",
        "status": "cancelled",
        "merchant_name": the company,
        "type": "merchant"
    }
    '''
    
    response = requests.get(f'http://api.nessieisreal.com/accounts/{account_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchases'}), response.status_code
    
    purchases = response.json()
    filtered_purchases = []
    for purchase in purchases:
        purchase_date = purchase['purchase_date']
        purchase_year, purchase_month, _ = purchase_date.split('-')
        
        if (not month or purchase_month == month) and (not year or purchase_year == year):
            purchase['merchant_name'] = merchant_id_data.get(purchase['merchant_id'], 'Unknown')
            filtered_purchases.append(purchase)
    
    print(len(filtered_purchases))
    inference_result = make_inference(body + str(filtered_purchases))
    return jsonify(inference_result), 200

@app.route("/api/mistral/monthly", methods=["GET"])
def get_mitral_monthly():
    account_id="67956cfc9683f20dd518b9d7"
    month = request.args.get('month')
    year = request.args.get('year')
    
    body = '''
    Important: All things are pet-related purchases, so focus on how much they're spending with categories of Food & Drinks, 
    House & Utilities, Shopping, Personal, or Subscriptions. DONT MENTION PET-RELATED PURCHASES. USE THE 5 CATEGORIES I MENTIONED
    Make sure to RANDOMIZE your categories AND DO IT BASED ON THE DATA. Don't give the same task everytime.
    
    Based on the data I give you, focus on daily, weekly, and monthly costs. I want a monthly summary.
    Make it 3 sentence max and make it concise like you spent <price> on House & Utilities. Also, provide feedback to how they can reduce their costs. 
    The prices and amounts should be based on the data given. The next few lines are the data. 
    Don't give your commentary. Each transaction has a schema of
    
    {
        "_id": "id",
        "amount": amount spent,
        "description": Where they purchase it at,
        "medium": "balance",
        "merchant_id": ignore this,
        "payer_id": "67956cfc9683f20dd518b9d7",
        "purchase_date": "2024-01-23",
        "status": "cancelled",
        "merchant_name": the company,
        "type": "merchant"
    }
    '''
    
    response = requests.get(f'http://api.nessieisreal.com/accounts/{account_id}/purchases?key=' + CAPITAL_ONE_API_KEY)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get purchases'}), response.status_code
    
    purchases = response.json()
    filtered_purchases = []
    for purchase in purchases:
        purchase_date = purchase['purchase_date']
        purchase_year, purchase_month, _ = purchase_date.split('-')
        
        if (not month or purchase_month == month) and (not year or purchase_year == year):
            purchase['merchant_name'] = merchant_id_data.get(purchase['merchant_id'], 'Unknown')
            filtered_purchases.append(purchase)
    
    print(len(filtered_purchases))
    inference_result = make_inference(body + str(filtered_purchases))
    return jsonify(inference_result), 200
    

if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)
    # app.run(debug=True, port=5000)
