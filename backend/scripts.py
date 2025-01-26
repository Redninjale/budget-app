import pandas as pd
import requests
from dotenv import load_dotenv
from app import CAPITAL_ONE_API_KEY, merchant_id_data

def load_merchant_csv(pathname):
    df = pd.read_csv(pathname)
    for index, row in df.iterrows():
        data = {
            "name": row.get("name", ""),
            "category": row.get("category", ""),
            "address": {
                "street_number": str(row.get("street_number", "")),
                "street_name": row.get("street_name", ""),
                "city": row.get("city", ""),
                "state": row.get("state", ""),
                "zip": str(row.get("zip", ""))
            },
            "geocode": {
                "lat": row.get("lat", 0),
                "lng": row.get("lng", 0)
            }
        }
        response = requests.post('http://api.nessieisreal.com/merchants?key='+ CAPITAL_ONE_API_KEY, json=data)
        if response.status_code != 201:
            print(f"Failed to post data for row {index}: {response.text}")
    print("Finished file loading")

def load_customer_merchant_csv(pathname):
    
    df = pd.read_csv(pathname)
    for index, row in df.iterrows():
        data = {
            "merchant_id": merchant_id_data[row.get("merchant_id", "")],
            "medium": row.get("medium", "balance"),
            "purchase_date": row.get("purchase_date", ""),
            "amount": row.get("amount", 0),
            "status": row.get("status", "pending"),
            "description": row.get("description", "")
        }
        response = requests.post('http://api.nessieisreal.com/accounts/67956cfc9683f20dd518b9d7/purchases?key=' + CAPITAL_ONE_API_KEY, json=data)
        if response.status_code != 201:
            print(f"Failed to post data for row {index}: {response.text}")
    print("Finished file loading")

if __name__ == "__main__":
    load_dotenv()
    # Call your functions here with the appropriate CSV file paths
    # Example:
    # load_merchant_csv('/path/to/merchant.csv')
    load_customer_merchant_csv('./capital_one_scripts/cat_merchant_transactions.csv')