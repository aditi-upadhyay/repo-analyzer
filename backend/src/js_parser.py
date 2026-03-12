import re


def extract_js_functions(file_path):

    functions = []

    try:

        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            code = f.read()

        pattern = r'function\s+(\w+)\s*\([^)]*\)\s*\{[^}]*\}'

        matches = re.findall(pattern, code)

        for match in matches:

            functions.append({
                "name": match,
                "file": file_path,
                "language": "javascript",
                "code": match
            })

    except Exception:
        pass

    return functions