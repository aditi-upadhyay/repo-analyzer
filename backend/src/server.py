from fastapi import FastAPI, BackgroundTasks, WebSocket, WebSocketDisconnect
import urllib.request
import logging
import sys
from fastapi.middleware.cors import CORSMiddleware
from .service.clone_repo import startAnalyzing, test
from pydantic import BaseModel
from .core.connection_shared import manager
from .config.db import sessions
from .routes.repository import router as repo_router
from .routes.config import router as config_router

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
app.include_router(config_router, prefix="/api")
@app.get("/users")
def get_users():
    return {"users": ["Aditi", "John"]}

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
    background_tasks.add_task(startAnalyzing, data.repo_url,
        data.session_id)
    return {"status": "Analysis started", "session_id": data.session_id}

# uvicorn src.server:app --reload