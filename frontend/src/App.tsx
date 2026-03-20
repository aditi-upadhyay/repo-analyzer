import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Layout/Dashboard";
import Repository from "./components/Repository";
import Documentation from "./components/Documentation";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="repositories" element={<Repository />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="chat" element={<div className="p-8">Chat Page (Work in Progress)</div>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App
