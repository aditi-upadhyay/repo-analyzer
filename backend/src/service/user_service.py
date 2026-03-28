from datetime import datetime
from bson import ObjectId
from typing import List, Optional
from ..config.db import user_collection
from ..schema.user import UserCreate
from pydantic import ValidationError
from fastapi import HTTPException

class UserService:
    @staticmethod
    def _add_ui_fields(user: dict) -> dict:
        """Add UI-specific fields for frontend."""
        status = user.get("status", "active").lower()
        if status == "active":
            user["color"] = "text-green-600 bg-green-50"
        elif status == "inactive":
            user["color"] = "text-slate-600 bg-slate-50"
        else:
            user["color"] = "text-red-600 bg-red-50"
        return user

    @staticmethod
    def create_user(user_data: dict) -> dict:
        # Explicit Schema Validation
        try:
            UserCreate(**user_data)
        except ValidationError as e:
            raise HTTPException(status_code=400, detail=f"Schema validation failed: {str(e)}")

        now = datetime.utcnow()
        user_data["createdAt"] = now
        user_data["updatedAt"] = now
        
        result = user_collection.insert_one(user_data)
        user_data["_id"] = str(result.inserted_id)
        return UserService._add_ui_fields(user_data)

    @staticmethod
    def get_users() -> List[dict]:
        users = list(user_collection.find({}))
        for user in users:
            user["_id"] = str(user["_id"])
            UserService._add_ui_fields(user)
        return users

    @staticmethod
    def get_user_by_id(user_id: str) -> Optional[dict]:
        user = user_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
            UserService._add_ui_fields(user)
        return user

    @staticmethod
    def update_user(user_id: str, update_data: dict) -> Optional[dict]:
        update_data["updatedAt"] = datetime.utcnow()
        
        result = user_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        if result.modified_count > 0 or result.matched_count > 0:
            return UserService.get_user_by_id(user_id)
        return None

    @staticmethod
    def delete_user(user_id: str) -> bool:
        result = user_collection.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0
