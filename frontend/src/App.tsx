import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Layout/Dashboard";
import Repository from "./components/Repository";
import Documentation from "./components/Documentation";
import AnalysisProgress from "./components/Analysis/AnalysisProgress";
import LandingPage from "./components/Landing/LandingPage";
import LoginPage from "./components/Landing/LoginPage";
function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-[#0B0F1A] text-white">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" replace />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="repositories" element={<Repository />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="analysis" element={<AnalysisProgress />} />
        <Route path="chat" element={<div className="p-8">Chat Page (Work in Progress)</div>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="signup" element={<LandingPage />} />
      <Route path="login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
    </Routes>
  );
}

export default App;
