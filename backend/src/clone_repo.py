from git import Repo
from git import Repo
import os

from .extract_functions import scan_repository
from .ai_doc_generator import generate_documentation

# REPO_URL = "https://github.com/aditi-upadhyay/fenrir-security-assessment.git"
REPO_URL = "https://gitlab.com/FlairLabs/Clients/bv/augmented-surveyor.git"
# REPO_URL = "https://github.com/pallets/flask"
CLONE_DIR = "./repo"


def clone_repository():
    if not os.path.exists(CLONE_DIR):
        print("Cloning repository...")
        Repo.clone_from(REPO_URL, CLONE_DIR)
        print("Repository cloned.\n")
    else:
        print("Repository already exists.\n")


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


if __name__ == "__main__":
    main()