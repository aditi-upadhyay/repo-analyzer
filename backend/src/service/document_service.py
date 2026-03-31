from datetime import datetime
from bson import ObjectId
from typing import List, Optional
from ..config.db import document_collection
from ..schema.document import DocumentCreate, DocumentUpdate
from pydantic import ValidationError
from fastapi import HTTPException

class DocumentService:
    @staticmethod
    def _add_ui_fields(doc: dict) -> dict:
        """Add color and human-readable time for frontend."""
        status = doc.get("status", "Pending").lower()
        if status == "completed":
            doc["color"] = "text-green-600 bg-green-50"
        elif status in ["processing", "pending"]:
            doc["color"] = "text-blue-600 bg-blue-50"
        elif status == "failed":
            doc["color"] = "text-red-600 bg-red-50"
        else:
            doc["color"] = "text-slate-600 bg-slate-50"
        
        return doc

    @staticmethod
    def create_document(doc_data: dict) -> dict:
        try:
            DocumentCreate(**doc_data)
        except ValidationError as e:
            raise HTTPException(status_code=400, detail=f"Schema validation failed: {str(e)}")

        doc_data["createdAt"] = datetime.utcnow()
        doc_data["updatedAt"] = doc_data["createdAt"]
        
        # Standardize IDs to ObjectId for storage
        if "repository_id" in doc_data:
            doc_data["repository_id"] = ObjectId(doc_data["repository_id"])
        if "user_id" in doc_data:
            doc_data["user_id"] = ObjectId(doc_data["user_id"])
        
        result = document_collection.insert_one(doc_data)
        doc_data["_id"] = str(result.inserted_id)
        
        # Convert ObjectIds back to strings for response
        if "repository_id" in doc_data:
            doc_data["repository_id"] = str(doc_data["repository_id"])
        if "user_id" in doc_data:
            doc_data["user_id"] = str(doc_data["user_id"])
            
        return DocumentService._add_ui_fields(doc_data)

    @staticmethod
    def get_documents(repository_id: Optional[str] = None, user_id: Optional[str] = None) -> List[dict]:
        query = {}
        if repository_id:
            query["repository_id"] = ObjectId(repository_id)
        if user_id:
            query["user_id"] = ObjectId(user_id)
            
        docs = list(document_collection.find(query))
        for doc in docs:
            doc["_id"] = str(doc["_id"])
            if "repository_id" in doc:
                doc["repository_id"] = str(doc["repository_id"])
            if "user_id" in doc:
                doc["user_id"] = str(doc["user_id"])
            DocumentService._add_ui_fields(doc)
        return docs

    @staticmethod
    def get_document_by_id(doc_id: str) -> Optional[dict]:
        doc = document_collection.find_one({"_id": ObjectId(doc_id)})
        if doc:
            doc["_id"] = str(doc["_id"])
            if "repository_id" in doc:
                doc["repository_id"] = str(doc["repository_id"])
            if "user_id" in doc:
                doc["user_id"] = str(doc["user_id"])
            DocumentService._add_ui_fields(doc)
        return doc

    @staticmethod
    def update_document(doc_id: str, update_data: dict) -> Optional[dict]:
        update_data["updatedAt"] = datetime.utcnow()
        
        # Prevent manual ID updates through this method if they are in the dict
        update_data.pop("_id", None)
        
        if "repository_id" in update_data:
            update_data["repository_id"] = ObjectId(update_data["repository_id"])
        if "user_id" in update_data:
            update_data["user_id"] = ObjectId(update_data["user_id"])

        result = document_collection.update_one(
            {"_id": ObjectId(doc_id)},
            {"$set": update_data}
        )
        if result.modified_count > 0 or result.matched_count > 0:
            return DocumentService.get_document_by_id(doc_id)
        return None

    @staticmethod
    def delete_document(doc_id: str) -> bool:
        result = document_collection.delete_one({"_id": ObjectId(doc_id)})
        return result.deleted_count > 0
