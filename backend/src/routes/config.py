from fastapi import APIRouter
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.get("/config/google-client-id")
async def get_google_client_id():
    return {"clientId": os.getenv("VITE_GOOGLE_CLIENT_ID")}
