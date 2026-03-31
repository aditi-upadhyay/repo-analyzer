from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from ..service.document_service import DocumentService
from ..schema.document import DocumentCreate, DocumentUpdate, DocumentResponse

router = APIRouter()

@router.post("/", response_model=DocumentResponse)
async def create_document(doc_data: DocumentCreate):
    return DocumentService.create_document(doc_data.dict())

@router.get("/", response_model=List[DocumentResponse])
async def get_documents(repository_id: Optional[str] = None, user_id: Optional[str] = None):
    return DocumentService.get_documents(repository_id, user_id)

@router.get("/{doc_id}", response_model=DocumentResponse)
async def get_document_by_id(doc_id: str):
    doc = DocumentService.get_document_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.put("/{doc_id}", response_model=DocumentResponse)
async def update_document(doc_id: str, update_data: DocumentUpdate):
    doc = DocumentService.update_document(doc_id, update_data.dict(exclude_unset=True))
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found or update failed")
    return doc

@router.delete("/{doc_id}")
async def delete_document(doc_id: str):
    success = DocumentService.delete_document(doc_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}
