from datetime import datetime
from bson import ObjectId
from typing import List, Optional
from ..config.db import repository_collection
from ..schema.repository import RepositoryCreate
from pydantic import ValidationError
from fastapi import HTTPException

class RepositoryService:
    @staticmethod
    def _add_ui_fields(repo: dict) -> dict:
        """Add color and human-readable time for frontend."""
        status = repo.get("status", "pending").lower()
        if status in ["completed", "analyzed"]:
            repo["color"] = "text-green-600 bg-green-50"
        elif status in ["processing", "pending"]:
            repo["color"] = "text-blue-600 bg-blue-50"
        elif status in ["failed"]:
            repo["color"] = "text-red-600 bg-red-50"
        else:
            repo["color"] = "text-slate-600 bg-slate-50"
        
        # Simple "updated" string
        repo["updated"] = "2 mins ago" # Placeholder or calculate from lastAnalyzedAt/createdAt
        return repo

    @staticmethod
    def create_repository(repo_data: dict) -> dict:
        # Explicit Schema Validation
        try:
            RepositoryCreate(**repo_data)
        except ValidationError as e:
            raise HTTPException(status_code=400, detail=f"Schema validation failed: {str(e)}")

        repo_data["createdAt"] = datetime.utcnow()
        repo_data["lastAnalyzedAt"] = None
        
        # Standardize to user_id and ObjectId
        u_id = repo_data.get("user_id") or repo_data.get("userId") or repo_data.get("user_Id")
        if u_id:
            repo_data["user_id"] = ObjectId(u_id)
            # Remove old field names if they exist
            repo_data.pop("userId", None)
            repo_data.pop("user_Id", None)
        
        result = repository_collection.insert_one(repo_data)
        repo_data["_id"] = str(result.inserted_id)
        if "user_id" in repo_data and repo_data["user_id"]:
            repo_data["user_id"] = str(repo_data["user_id"])
        return RepositoryService._add_ui_fields(repo_data)

    @staticmethod
    def get_repositories(user_id: Optional[str] = None) -> List[dict]:
        query = {}
        if user_id:
            try:
                # Try to find by ObjectId OR String, across all possible field names
                oid = ObjectId(user_id)
                query["$or"] = [
                     {"user_id": user_id},
                ]
            except Exception:
                # If invalid ObjectId format, just check as string
                query["$or"] = [
                    {"user_id": user_id},
                ]
        
        repos = list(repository_collection.find(query))
        for repo in repos:
            repo["_id"] = str(repo["_id"])
            
            # Normalize user ID field for frontend consistency (always use user_id as string)
            u_id = repo.get("user_id") or repo.get("userId") or repo.get("user_Id")
            if u_id:
                repo["user_id"] = str(u_id)
                
            RepositoryService._add_ui_fields(repo)
        return repos

    @staticmethod
    def get_repository_by_id(repo_id: str) -> Optional[dict]:
        repo = repository_collection.find_one({"_id": ObjectId(repo_id)})
        if repo:
            repo["_id"] = str(repo["_id"])
            
            # Normalize user ID field
            u_id = repo.get("user_id") or repo.get("userId") or repo.get("user_Id")
            if u_id:
                repo["user_id"] = str(u_id)
                
            RepositoryService._add_ui_fields(repo)
        return repo

    @staticmethod
    def update_repository(repo_id: str, update_data: dict) -> Optional[dict]:
        # Standardize to user_id and ObjectId if provided
        u_id = update_data.get("user_id") 
        if u_id:
            update_data["user_id"] = ObjectId(u_id)
            # Ensure old field names are not re-added
            update_data.pop("user_Id", None)
            
        result = repository_collection.update_one(
            {"_id": ObjectId(repo_id)},
            {"$set": update_data}
        )
        if result.modified_count > 0 or result.matched_count > 0:
            return RepositoryService.get_repository_by_id(repo_id)
        return None

    @staticmethod
    def delete_repository(repo_id: str) -> bool:
        result = repository_collection.delete_one({"_id": ObjectId(repo_id)})
        return result.deleted_count > 0
