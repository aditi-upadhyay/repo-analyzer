import requests
import json

BASE_URL = "http://localhost:8000"

def test_get_latest_doc():
    # We need a user_id. Let's try to find one from existing documents or just use a known one.
    # From AuthContext, we see it fetches from /api/documents/{user_id}
    
    # Let's try to get all users first to find a valid user_id
    try:
        users_resp = requests.get(f"{BASE_URL}/api/users")
        users = users_resp.json()
        if not users:
            print("No users found")
            return
        
        user_id = users[0].get("_id")
        print(f"Testing with user_id: {user_id}")
        
        # Test latest doc
        latest_resp = requests.get(f"{BASE_URL}/api/documents/latest/{user_id}")
        if latest_resp.status_code == 200:
            doc = latest_resp.json()
            if doc:
                print("Latest Document Found:")
                print(json.dumps(doc, indent=2))
            else:
                print("No document found for this user (this might be expected if user has no docs)")
        else:
            print(f"Failed to get latest doc: {latest_resp.status_code}")
            print(latest_resp.text)
            
    except Exception as e:
        print(f"Error during test: {e}")

if __name__ == "__main__":
    test_get_latest_doc()
