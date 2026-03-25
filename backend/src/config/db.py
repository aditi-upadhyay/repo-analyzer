from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

password = os.getenv("PASSWORD")
user_name = os.getenv("USER_NAME")

client = MongoClient(
    f"mongodb+srv://{user_name}:{password}@repo-analyzer.ajssszn.mongodb.net/?appName=repo-analyzer",
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=5000
)
db = client["repo-analyzer"]

repository_collection = db["repository"]
sessions = db["sessions"]