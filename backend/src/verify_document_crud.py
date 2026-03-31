import sys
import os
from bson import ObjectId
from datetime import datetime

# Add the parent directory to sys.path to allow relative imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from backend.src.service.document_service import DocumentService
    from backend.src.schema.document import DocumentCreate
    print("Imports successful!")
    
    # We won't actually hit the database if we can't connect,
    # but we can test the UI field addition logic.
    test_doc = {
        "status": "Completed",
        "content": "Test content"
    }
    processed_doc = DocumentService._add_ui_fields(test_doc)
    print(f"Processed doc color: {processed_doc.get('color')}")
    assert processed_doc.get("color") == "text-green-600 bg-green-50"
    print("UI logic test passed!")

except Exception as e:
    print(f"Error during verification: {e}")
    sys.exit(1)
