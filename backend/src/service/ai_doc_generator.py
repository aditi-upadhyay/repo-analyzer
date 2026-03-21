# import os
# from dotenv import load_dotenv
# from google import genai

# # Load .env file
# load_dotenv()

# api_key = os.getenv("GEMINI_API_KEY")

# if not api_key:
#     raise ValueError("GEMINI_API_KEY not found in environment variables")

# client = genai.Client(api_key=api_key)

# def generate_documentation(function_data):

#     code = function_data["code"]

#     prompt = f"""
#     Explain the following function and generate documentation.

#     Include:
#     - Purpose
#     - Parameters
#     - Return value
#     - Example usage

#     Code:
#     {code}
#     """

#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=prompt
#     )

#     return response.text


import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

# Gemini client
client = genai.Client(api_key=api_key)


def read_readme(repo_path):
    """
    Reads README.md from the cloned repository
    """

    readme_path = os.path.join(repo_path, "README.md")

    if not os.path.exists(readme_path):
        return "README file not found in repository."

    with open(readme_path, "r", encoding="utf-8") as f:
        return f.read()


def generate_documentation(function_list, repo_path):
    """
    Generates project documentation using Gemini
    """

    # Read README
    readme_content = read_readme(repo_path)

    # Convert function list to readable text
    functions_text = "\n".join(function_list)

    prompt = f"""
You are a senior software architect and technical documentation expert.

Your task is to generate **complete project documentation** for a GitHub repository.

Project Context:

The repository has been analyzed automatically.

The system performed the following steps:
1. Cloned the repository
2. Scanned JavaScript and JSX files
3. Extracted function names
4. Read the README.md file for project context

README Content:
{readme_content}

Extracted Functions:
{functions_text}

Generate structured documentation with the following sections:

1. Project Overview
2. Key Features
3. Tech Stack
4. Project Structure
5. Key Components / Functions
6. Installation Steps
7. Usage Instructions
8. Example Workflow
9. Future Improvements

Return the output in **clean Markdown format**.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    documentation = response.text

    # Save documentation file
    save_path = "PROJECT_DOCUMENTATION.md"

    with open(save_path, "w", encoding="utf-8") as f:
        f.write(documentation)

    print(f"\nDocumentation saved to {save_path}")

    return documentation