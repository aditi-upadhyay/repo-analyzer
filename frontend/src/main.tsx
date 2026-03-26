import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL 

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
const root = createRoot(rootElement);

const init = async () => {
  try {
    
    const response = await axios.get(`${apiBaseUrl}/api/config/google-client-id`);

    const clientId = response.data.clientId;

    root.render(
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    );
  } catch (error) {
    console.error("Initialization error:", error);
    // You might want to render a fallback UI here if the config fails to load
    root.render(
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connection Error</h1>
          <p className="text-gray-400">Failed to load application configuration.</p>
          <p className="text-gray-500 text-sm mt-2">Please ensure the backend is running.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
};

init();
