from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: str
    fullName: Optional[str] = None
    avatarUrl: Optional[str] = None
    role: str = "user"
    status: str = "active"
    googleId: Optional[str] = None
    lastLogin: Optional[datetime] = None

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    fullName: Optional[str] = None
    avatarUrl: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None

class UserResponse(UserBase):
    id: str = Field(alias="_id")
    createdAt: datetime
    updatedAt: datetime

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
