# Use the native inference API to send a text message to Mistral.

import boto3
import json
from botocore.exceptions import ClientError

# Create a Bedrock Runtime client in the AWS Region of your choice.
client = boto3.client("bedrock-runtime", region_name="us-west-2")

# Set the model ID, e.g., Mistral Large.
model_id = "mistral.mixtral-8x7b-instruct-v0:1"

# Define the prompt for the model.
prompt = '''You are a financial educator helping clients learn to budget and save their money. I want 3 scenarios of what ifs
1. What if they shopped 2 times instead of 3 times weekly, they could be saving 1/3 of their money
2. What if they bought groceries for a week instead of eating out 5 times weekly, they could be saving $200
3. What if they moved to a cheaper apartment, they could be saving $400 monthly

I need them all to be good alternatives to every category. The costs saved cannot be made up, so try to be reasonable. This is the data break it down into
day, week, and monthly tips.'''

# Embed the prompt in Mistral's instruction format.
formatted_prompt = f"<s>[INST] {prompt} [/INST]"

# Format the request payload using the model's native structure.
native_request = {
    "prompt": formatted_prompt,
    "max_tokens": 512,
    "temperature": 0.5,
}

# Convert the native request to JSON.
request = json.dumps(native_request)

try:
    # Invoke the model with the request.
    response = client.invoke_model(modelId=model_id, body=request)

except (ClientError, Exception) as e:
    print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
    exit(1)

# Decode the response body.
model_response = json.loads(response["body"].read())

# Extract and print the response text.
response_text = model_response["outputs"][0]["text"]
print(response_text)


