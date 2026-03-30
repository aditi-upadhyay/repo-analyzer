from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class RepositoryBase(BaseModel):
    name: str
    repoUrl: str
    sourceType: str = "github"
    status: str = "pending"
    user_id: Optional[str] = None

class RepositoryCreate(RepositoryBase):
    pass

class RepositoryUpdate(BaseModel):
    name: Optional[str] = None
    repoUrl: Optional[str] = None
    sourceType: Optional[str] = None
    status: Optional[str] = None
    lastAnalyzedAt: Optional[datetime] = None

class RepositoryResponse(RepositoryBase):
    id: str = Field(alias="_id")
    lastAnalyzedAt: Optional[datetime] = None
    createdAt: datetime
    # Fields expected by the frontend for UI display
    color: Optional[str] = "text-slate-600 bg-slate-50"
    updated: Optional[str] = "Recently"

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
