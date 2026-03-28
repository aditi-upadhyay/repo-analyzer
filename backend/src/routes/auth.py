from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..service.auth_service import AuthService

router = APIRouter()

class GoogleAuthRequest(BaseModel):
    token: str

@router.post("/auth/google")
def google_auth(request: GoogleAuthRequest):
    try:
        user_data = AuthService.verify_google_token(request.token)
        return {"status": "success", "data": user_data}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
