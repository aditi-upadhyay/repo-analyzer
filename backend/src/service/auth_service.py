import os
from datetime import datetime
from google.oauth2 import id_token
from google.auth.transport import requests
from ..config.db import user_collection
from ..service.user_service import UserService

GOOGLE_CLIENT_ID = os.getenv("VITE_GOOGLE_CLIENT_ID")

class AuthService:
    @staticmethod
    def verify_google_token(token: str) -> dict:
        try:
            # Verify the ID token
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            email = idinfo['email']
            full_name = idinfo.get('name')
            avatar_url = idinfo.get('picture')
            
            # Check if user exists
            user = user_collection.find_one({"email": email})
            
            if user:
                # Update existing user
                update_data = {
                    "fullName": full_name,
                    "avatarUrl": avatar_url,
                    "updatedAt": datetime.utcnow()
                }
                user_collection.update_one({"_id": user["_id"]}, {"$set": update_data})
                user = user_collection.find_one({"_id": user["_id"]})
            else:
                # Create new user
                # Generate a simple username from email
                username = email.split('@')[0]
                user_data = {
                    "username": username,
                    "email": email,
                    "fullName": full_name,
                    "avatarUrl": avatar_url,
                    "role": "user",
                    "status": "active",
                    "createdAt": datetime.utcnow(),
                    "updatedAt": datetime.utcnow()
                }
                result = user_collection.insert_one(user_data)
                user = user_collection.find_one({"_id": result.inserted_id})
            
            # Prepare response (convert ObjectId to str)
            user["_id"] = str(user["_id"])
            return UserService._add_ui_fields(user)

        except ValueError as e:
            # Invalid token
            raise Exception(f"Invalid Google token: {str(e)}")
        except Exception as e:
            raise Exception(f"Error during Google authentication: {str(e)}")
