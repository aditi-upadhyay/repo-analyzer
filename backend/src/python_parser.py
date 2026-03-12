import ast


def extract_python_functions(file_path):

    functions = []

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            source = f.read()

        tree = ast.parse(source)

        for node in ast.walk(tree):

            if isinstance(node, ast.FunctionDef):

                start = node.lineno - 1
                end = node.end_lineno

                function_code = "\n".join(source.splitlines()[start:end])

                functions.append({
                    "name": node.name,
                    "file": file_path,
                    "language": "python",
                    "code": function_code
                })

    except Exception:
        pass

    return functions