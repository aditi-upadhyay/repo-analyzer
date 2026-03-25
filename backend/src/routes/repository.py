# routes/repository.py
from fastapi import APIRouter
from ..config.db import repository_collection

router = APIRouter()

@router.get("/repositories")
def get_all_repositories():
    repos = list(repository_collection.find())

    # Convert ObjectId to string
    for repo in repos:
        repo["_id"] = str(repo["_id"])

    return {
        "status": "success",
        "data": repos
    }