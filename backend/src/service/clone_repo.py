import os
import asyncio
import shutil
import zipfile
from datetime import datetime
from git import Repo

from .extract_functions import scan_repository
from .ai_doc_generator import generate_documentation
from .document_service import DocumentService
from .repository_service import RepositoryService
from ..core.connection_shared import manager
# REPO_URL = "https://github.com/aditi-upadhyay/fenrir-security-assessment.git"
REPO_URL = "https://gitlab.com/FlairLabs/Clients/bv/augmented-surveyor.git"
# REPO_URL = "https://github.com/pallets/flask"
CLONE_DIR = "./repo"
# manager is now imported from ..core.connection_shared

def clone_repository(repo_url: str, clone_dir: str, access_token: str = None):
    if os.path.exists(clone_dir):
        print(f"Removing existing directory: {clone_dir}")
        shutil.rmtree(clone_dir)
    
    auth_url = repo_url
    if access_token:
        # Assuming GitHub-style URL: https://github.com/user/repo.git
        # If it's already got a token, we might need more complex parsing, 
        # but for now, let's insert it.
        if "github.com" in repo_url:
            auth_url = repo_url.replace("https://", f"https://{access_token}@")
        elif "gitlab.com" in repo_url:
             auth_url = repo_url.replace("https://", f"https://oauth2:{access_token}@")

    print(f"Cloning repository: {repo_url} into {clone_dir}")
    Repo.clone_from(auth_url, clone_dir)
    print("Repository cloned.\n")


def main():

    clone_repository()

    print("Scanning repository...\n")

    functions = scan_repository(CLONE_DIR)

    print("Total functions found:", len(functions))

    print("\nGenerating documentation...\n")

    for func in functions[:5]:

        print("=" * 50)
        print("Function:", func["name"])

        docs = generate_documentation(func, CLONE_DIR)

        # print(docs)

async def _run_analysis_pipeline(clone_dir: str, session_id: str, repo_id: str = None, user_id: str = None, documentation: str = None):
    try:
        if repo_id:
            RepositoryService.update_repository(repo_id, {
                "status": "processing",
                "updatedAt": datetime.utcnow()
            })
        
        await manager.send_message(session_id, "SCANNING: Scanning repository...")
        print("Scanning repository...\n")
        functions = await asyncio.to_thread(scan_repository, clone_dir)

        await manager.send_message(session_id, "EXTRACTING: extracting functions")
        
        await manager.send_message(session_id, "AI: Generating documentation...")
        print("\nGenerating documentation...\n")
        
        function_names = [f["name"] for f in functions]
        documentation = await asyncio.to_thread(generate_documentation, function_names, clone_dir)
        
        await manager.send_message(session_id, "GENERATING: Documentation generated successfully")
        await manager.send_message(session_id, "GENERATED: Process complete")

        if repo_id:
            RepositoryService.update_repository(repo_id, {
                "status": "completed",
                "updatedAt": datetime.utcnow()
            })
        
        if repo_id and user_id:
            try:
                doc_entry = {
                    "repository_id": str(repo_id),
                    "user_id": str(user_id),
                    "content": documentation,
                    "status": "Completed"
                }
                DocumentService.create_document(doc_entry)
                print(f"✅ Documentation saved to DB for repo {repo_id}")
            except Exception as e:
                print(f"❌ Failed to save documentation to DB: {e}")

    except Exception as e:
        print(f"Error during analysis: {e}")
        if repo_id:
            try:
                RepositoryService.update_repository(repo_id, {
                    "status": "failed",
                    "updatedAt": datetime.utcnow()
                })
            except Exception as update_err:
                print(f"❌ Failed to update repository status to failed: {update_err}")

        await manager.send_message(session_id, f"ERROR: {str(e)}")

async def startAnalyzing(url: str, session_id: str, access_token: str = None, repo_id: str = None, user_id: str = None):
    clone_dir = f"./repo_{session_id}"
    
    # Wait for websocket to connect (up to 5 seconds)
    for _ in range(10):
        if session_id in manager.active_connections:
            print(f"📡 WebSocket connected for session {session_id}")
            break
        await asyncio.sleep(0.5)
    else:
        print(f"⚠️ Warning: WebSocket for session {session_id} not connected after timeout")

    try:
        await manager.send_message(session_id, "CLONING: Cloning repository...")
        await asyncio.to_thread(clone_repository, url, clone_dir, access_token)
        await _run_analysis_pipeline(clone_dir, session_id, repo_id, user_id)
    except Exception as e:
        print(f"Error during cloning: {e}")
        await manager.send_message(session_id, f"ERROR: {str(e)}")

async def startAnalyzingZip(zip_path: str, session_id: str, repo_id: str = None, user_id: str = None):
    clone_dir = f"./repo_{session_id}"
    
    # Wait for websocket to connect
    for _ in range(10):
        if session_id in manager.active_connections:
            break
        await asyncio.sleep(0.5)

    try:
        await manager.send_message(session_id, "EXTRACTING: Extracting archive...")
        
        if os.path.exists(clone_dir):
            shutil.rmtree(clone_dir)
        os.makedirs(clone_dir)

        if zip_path.endswith('.zip'):
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(clone_dir)
        elif zip_path.endswith(('.tar.gz', '.tgz')):
            import tarfile
            with tarfile.open(zip_path, 'r:gz') as tar_ref:
                tar_ref.extractall(clone_dir)
        
        await _run_analysis_pipeline(clone_dir, session_id, repo_id, user_id)
        
    except Exception as e:
        print(f"Error during extraction: {e}")
        await manager.send_message(session_id, f"ERROR: {str(e)}")
    finally:
        if os.path.exists(zip_path):
            os.remove(zip_path)


async def test(url: str, session_id: str):
    clone_dir = f"./repo_{session_id}"
    
    # Wait for websocket to connect (up to 5 seconds)
    for _ in range(10):
        if session_id in manager.active_connections:
            print(f"📡 WebSocket connected for session {session_id}")
            break
        await asyncio.sleep(0.5)
    else:
        print(f"⚠️ Warning: WebSocket for session {session_id} not connected after timeout")

    try:
        await manager.send_message(session_id, "CLONING: Cloning repository...")

        await manager.send_message(session_id, "SCANNING: Scanning repository...")
        print("Scanning repository...\n")

        await manager.send_message(session_id, f"EXTRACTING: extracting functions")

        await manager.send_message(session_id, "AI: Generating documentation...")
        print("\nGenerating documentation...\n")
                
        await manager.send_message(session_id, "GENERATING: Documentation generated successfully")
        await manager.send_message(session_id, "GENERATED: Process complete")
        
    except Exception as e:
        print(f"Error during analysis: {e}")
        await manager.send_message(session_id, f"ERROR: {str(e)}")



if __name__ == "__main__":
    main()