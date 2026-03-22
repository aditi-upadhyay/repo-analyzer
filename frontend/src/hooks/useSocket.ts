import { useEffect, useState } from "react";
import SocketService from "../services/socket";

export const useSocket = (sessionId: string) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!sessionId) return;

    SocketService.connect(sessionId, (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      SocketService.disconnect();
    };
  }, [sessionId]);

  return { messages };
};