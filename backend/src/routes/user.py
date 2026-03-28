from fastapi import APIRouter, HTTPException
from typing import List, Optional
from ..service.user_service import UserService
from ..schema.user import UserCreate, UserUpdate, UserResponse

router = APIRouter()

@router.post("/users")
def create_user(user: UserCreate):
    new_user = UserService.create_user(user.dict())
    return {"status": "success", "data": new_user}

@router.get("/users")
def get_all_users():
    users = UserService.get_users()
    return {"status": "success", "data": users}

@router.get("/users/{user_id}")
def get_user(user_id: str):
    user = UserService.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "success", "data": user}

@router.put("/users/{user_id}")
def update_user(user_id: str, user_update: UserUpdate):
    updated = UserService.update_user(user_id, user_update.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="User not found or no changes made")
    return {"status": "success", "data": updated}

@router.delete("/users/{user_id}")
def delete_user(user_id: str):
    deleted = UserService.delete_user(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "success", "message": "User deleted successfully"}
