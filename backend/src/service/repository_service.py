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
        if "userId" in repo_data and repo_data["userId"]:
             repo_data["userId"] = ObjectId(repo_data["userId"])
        
        result = repository_collection.insert_one(repo_data)
        repo_data["_id"] = str(result.inserted_id)
        if "userId" in repo_data and repo_data["userId"]:
            repo_data["userId"] = str(repo_data["userId"])
        return RepositoryService._add_ui_fields(repo_data)

    @staticmethod
    def get_repositories(user_id: Optional[str] = None) -> List[dict]:
        query = {}
        if user_id:
            query["userId"] = ObjectId(user_id)
        
        repos = list(repository_collection.find(query))
        for repo in repos:
            repo["_id"] = str(repo["_id"])
            if "userId" in repo and repo["userId"]:
                repo["userId"] = str(repo["userId"])
            RepositoryService._add_ui_fields(repo)
        return repos

    @staticmethod
    def get_repository_by_id(repo_id: str) -> Optional[dict]:
        repo = repository_collection.find_one({"_id": ObjectId(repo_id)})
        if repo:
            repo["_id"] = str(repo["_id"])
            if "userId" in repo and repo["userId"]:
                repo["userId"] = str(repo["userId"])
            RepositoryService._add_ui_fields(repo)
        return repo

    @staticmethod
    def update_repository(repo_id: str, update_data: dict) -> Optional[dict]:
        if "userId" in update_data and update_data["userId"]:
            update_data["userId"] = ObjectId(update_data["userId"])
            
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
