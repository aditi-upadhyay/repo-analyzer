from git import Repo
import os
import asyncio
import shutil

from .extract_functions import scan_repository
from .ai_doc_generator import generate_documentation
from ..core.connection_shared import manager
# REPO_URL = "https://github.com/aditi-upadhyay/fenrir-security-assessment.git"
REPO_URL = "https://gitlab.com/FlairLabs/Clients/bv/augmented-surveyor.git"
# REPO_URL = "https://github.com/pallets/flask"
CLONE_DIR = "./repo"
# manager is now imported from ..core.connection_shared

def clone_repository(repo_url: str, clone_dir: str):
    if os.path.exists(clone_dir):
        print(f"Removing existing directory: {clone_dir}")
        shutil.rmtree(clone_dir)
    
    print(f"Cloning repository: {repo_url} into {clone_dir}")
    Repo.clone_from(repo_url, clone_dir)
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

async def startAnalyzing(url: str, session_id: str):
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
        await asyncio.to_thread(clone_repository, url, clone_dir)

        await manager.send_message(session_id, "SCANNING: Scanning repository...")
        print("Scanning repository...\n")
        functions = await asyncio.to_thread(scan_repository, clone_dir)

        await manager.send_message(session_id, f"EXTRACTING: extracting functions")
        # print(f"Total functions found: {len(functions)}")

        await manager.send_message(session_id, "AI: Generating documentation...")
        print("\nGenerating documentation...\n")
        
        # Mapping functions to just names for the generator
        function_names = [f["name"] for f in functions]
        
        documentation = await asyncio.to_thread(generate_documentation, function_names, clone_dir)
        
        await manager.send_message(session_id, "GENERATING: Documentation generated successfully")
        await manager.send_message(session_id, "GENERATED: Process complete")
        
    except Exception as e:
        print(f"Error during analysis: {e}")
        await manager.send_message(session_id, f"ERROR: {str(e)}")
    finally:
        # Optional: cleanup clone_dir
        # if os.path.exists(clone_dir):
        #     shutil.rmtree(clone_dir)
        pass


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