import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout dla wszystkich "zalogowanych" */}
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard pod /dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Opcjonalnie: przekierowanie z / na /dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* inne ścieżki poza layoutem */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
}
