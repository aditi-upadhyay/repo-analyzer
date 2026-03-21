from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from .service.clone_repo import startAnalyzing
from pydantic import BaseModel

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

@app.get("/")
def home():
    return {"message": "Hello World"}

@app.get("/users")
def get_users():
    return {"users": ["Aditi", "John"]}

@app.post("/analyze")
def analyze_repo(data: RepoRequest, background_tasks: BackgroundTasks):
    print("Analyzing your repo ---------------")

    background_tasks.add_task(startAnalyzing, data.repo_url)

    return {"status": "Analyzing", "repo": data.repo_url}