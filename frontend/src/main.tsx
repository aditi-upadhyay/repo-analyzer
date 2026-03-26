import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId="303934760390-91hr585dl2k8b3hqqgp9nnqb68jm5e0r.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>

  // </StrictMode>,
);
