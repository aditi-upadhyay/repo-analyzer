class SocketService {
  private socket: WebSocket | null = null;
  private onMessageCallback: ((data: string) => void) | null = null;
  private isConnecting = false;

  connect(sessionId: string, onMessage: (data: string) => void) {
    if (this.socket?.readyState === WebSocket.OPEN || this.isConnecting) {
      console.log("⚠️ WebSocket already connected or connecting.");
      this.onMessageCallback = onMessage; // Update callback even if already connected
      return;
    }

    this.isConnecting = true;
    this.onMessageCallback = onMessage;

    this.socket = new WebSocket(`ws://localhost:8000/ws?sessionId=${sessionId}`); 
    this.socket.onopen = () => {
      console.log("✅ Connected to WebSocket");
      this.isConnecting = false;
    };

    this.socket.onmessage = (event) => {
        console.log("Recieved socket messages", event.data)
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };

    this.socket.onclose = () => {
      console.log("❌ Disconnected. Reconnecting...");
      this.isConnecting = false;
      this.socket = null;
      setTimeout(() => this.connect(sessionId, onMessage), 3000);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.isConnecting = false;
    };
  }

  send(message: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.warn("⚠️ WebSocket is not open. Message not sent.");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.onclose = null; // Prevent reconnection on intentional disconnect
      this.socket.close();
      this.socket = null;
      this.onMessageCallback = null;
      this.isConnecting = false;
    }
  }
}

export default new SocketService();