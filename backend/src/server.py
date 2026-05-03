from fastapi import FastAPI, BackgroundTasks, WebSocket, WebSocketDisconnect, File, UploadFile, Form
import urllib.request
import logging
import sys
from fastapi.middleware.cors import CORSMiddleware
from .service.clone_repo import startAnalyzing, startAnalyzingZip, test
from .service.repository_service import RepositoryService
from pydantic import BaseModel
from .core.connection_shared import manager
from .config.db import sessions
from .routes.repository import router as repo_router
from .routes.user import router as user_router
from .routes.auth import router as auth_router
from .routes.config import router as config_router
from .routes.document import router as document_router
from typing import Optional

try:
    sessions.insert_one({"test": "hello"})
    print("Database connected successfully!")
except Exception as e:
    print(e)
    
app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RepoRequest(BaseModel):
    repo_url: str
    session_id: str 
    access_token: Optional[str] = None
    user_id: Optional[str] = None

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    session_id = websocket.query_params.get("sessionId")

    if not session_id:
        print(" No sessionId, closing")
        await websocket.close()
        return

    print("Incoming socket:", session_id)

    await websocket.accept()

    await manager.connect(session_id, websocket)

    try:
        while True:
            await websocket.receive_text()
    except:
        manager.disconnect(session_id)

app.include_router(repo_router, prefix="/api")
app.include_router(user_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(config_router, prefix="/api")
app.include_router(document_router, prefix="/api/documents", tags=["documents"])

@app.get("/documentation")
def get_documentation():
    import os
    doc_path = os.path.join(os.getcwd(), "PROJECT_DOCUMENTATION.md")
    if not os.path.exists(doc_path):
        return {"error": "Documentation file not found"}
    with open(doc_path, "r") as f:
        content = f.read()
    return {"content": content}

@app.post("/analyze")
async def analyze_repo(data: RepoRequest, background_tasks: BackgroundTasks):
    # Parse repo name from URL
    repo_name = data.repo_url.split("/")[-1].replace(".git", "")
    
    # Create entry in repository table
    repo_entry = {
        "name": repo_name,
        "repoUrl": data.repo_url,
        "user_id": data.user_id,
        "status": "pending",
        "sourceType": "github" if "github.com" in data.repo_url else "gitlab" if "gitlab.com" in data.repo_url else "other"
    }
    new_repo = RepositoryService.create_repository(repo_entry)

    background_tasks.add_task(startAnalyzing, data.repo_url,
        data.session_id, data.access_token, new_repo["_id"], data.user_id)
    return {"status": "Analysis started", "session_id": data.session_id}

@app.post("/analyze-zip")
async def analyze_zip(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    session_id: str = Form(...),
    user_id: Optional[str] = Form(None)
):
    import shutil
    import os
    
    # Create temp directory if not exists
    temp_dir = "./temp_uploads"
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir)
        
    file_path = os.path.join(temp_dir, f"{session_id}_{file.filename}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    repo_name = file.filename.rsplit(".", 1)[0]
    
    # Create entry in repository table
    repo_entry = {
        "name": repo_name,
        "repoUrl": "uploaded_zip",
        "user_id": user_id,
        "status": "pending",
        "sourceType": "zip"
    }
    new_repo = RepositoryService.create_repository(repo_entry)

    background_tasks.add_task(startAnalyzingZip, file_path,
        session_id, new_repo["_id"], user_id)
        
    return {"status": "Analysis started", "session_id": session_id}

