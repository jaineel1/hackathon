import urllib.request
import json

BASE_URL = "http://localhost:8000"

def test_assistant():
    url = f"{BASE_URL}/assistant/chat"
    payload = {
        "user_id": 3,
        "role_id": 1,
        "message": "Why is my score low?"
    }
    
    try:
        req = urllib.request.Request(url, 
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode())
            print("\n--- Chatbot Response ---")
            print(f"Message: {res_data['response']}")
            print(f"Actions: {res_data['suggested_actions']}")
    except Exception as e:
        print(f"Error testing chatbot: {e}")

if __name__ == "__main__":
    test_assistant()
