from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class DocumentBase(BaseModel):
    repository_id: str
    content: str
    user_id: str
    status: str = "Pending"

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    content: Optional[str] = None
    status: Optional[str] = None
    updatedAt: Optional[datetime] = None

class DocumentResponse(DocumentBase):
    id: str = Field(alias="_id")
    createdAt: datetime
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}
