# routes/repository.py
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from ..service.repository_service import RepositoryService
from ..schema.repository import RepositoryCreate, RepositoryUpdate, RepositoryResponse

router = APIRouter()

@router.post("/repositories")
def create_repo(repo: RepositoryCreate):
    new_repo = RepositoryService.create_repository(repo.dict())
    return {"status": "success", "data": new_repo}

@router.get("/repositories")
def get_all_repositories(userId: Optional[str] = None):
    repos = RepositoryService.get_repositories(userId)
    return {"status": "success", "data": repos}

@router.get("/repositories/{repo_id}")
def get_repo(repo_id: str):
    repo = RepositoryService.get_repository_by_id(repo_id)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    return {"status": "success", "data": repo}

@router.put("/repositories/{repo_id}")
def update_repo(repo_id: str, repo_update: RepositoryUpdate):
    updated = RepositoryService.update_repository(repo_id, repo_update.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Repository not found or no changes made")
    return {"status": "success", "data": updated}

@router.delete("/repositories/{repo_id}")
def delete_repo(repo_id: str):
    deleted = RepositoryService.delete_repository(repo_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Repository not found")
    return {"status": "success", "message": "Repository deleted successfully"}