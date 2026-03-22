from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, session_id: str, websocket: WebSocket):
        self.active_connections[session_id] = websocket
        print("🟢 Connected:", session_id)

    def disconnect(self, session_id: str):
        self.active_connections.pop(session_id, None)
        print("🔴 Disconnected:", session_id)

    async def send_message(self, session_id: str, message: str):
        websocket = self.active_connections.get(session_id)
        if websocket:
            await websocket.send_text(message)