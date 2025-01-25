import pandas as pd
import requests

def load_merchant_csv(pathname):
    df = pd.read_csv(pathname)
    for index, row in df.iterrows():
        data = {
            "name": row.get("name", ""),
            "category": row.get("category", ""),
            "address": {
                "street_number": row.get("street_number", ""),
                "street_name": row.get("street_name", ""),
                "city": row.get("city", ""),
                "state": row.get("state", ""),
                "zip": row.get("zip", "")
            },
            "geocode": {
                "lat": row.get("lat", 0),
                "lng": row.get("lng", 0)
            }
        }
        response = requests.post('https://example.com/api', json=data)
        if response.status_code != 200:
            print(f"Failed to post data for row {index}: {response.text}")

def load_customer_merchant_csv(pathname):
    df = pd.read_csv(pathname)
    for index, row in df.iterrows():
        data = {
            "merchant_id": row.get("merchant_id", ""),
            "medium": row.get("medium", "balance"),
            "purchase_date": row.get("purchase_date", ""),
            "amount": row.get("amount", 0),
            "status": row.get("status", "pending"),
            "description": row.get("description", "")
        }
        response = requests.post('https://example.com/api', json=data)
        if response.status_code != 200:
            print(f"Failed to post data for row {index}: {response.text}")
