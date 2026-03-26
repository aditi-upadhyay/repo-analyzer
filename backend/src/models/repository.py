from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class RepositoryBase(BaseModel):
    name: str
    repoUrl: str
    sourceType: str = "github"
    status: str = "pending"
    userId: Optional[str] = None

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

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}

