import os
from .python_parser import extract_python_functions
from .js_parser import extract_js_functions

SUPPORTED_JS = (".js", ".ts", ".jsx", ".tsx")
SUPPORTED_PY = (".py",)


def scan_repository(repo_path):

    all_functions = []
    print("repo - path ----------", repo_path)
    for root, dirs, files in os.walk(repo_path):

        for file in files:

            file_path = os.path.join(root, file)

            try:

                if file.endswith(SUPPORTED_JS):

                    functions = extract_js_functions(file_path)
                    all_functions.extend(functions)

                elif file.endswith(SUPPORTED_PY):

                    functions = extract_python_functions(file_path)
                    all_functions.extend(functions)

            except Exception as e:
                print("Skipping file:", file_path)
                print("Error:", e)

    return all_functions