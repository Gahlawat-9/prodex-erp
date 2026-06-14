import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { getUser } from "@/lib/auth";
import { LoginPage } from "@/routes/login";
import { Dashboard } from "@/routes/dashboard";
import { ModulePage } from "@/routes/module.$moduleId";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return getUser() ? children : <Navigate to="/login" replace />;
}

function HomeRedirect() {
  return <Navigate to={getUser() ? "/dashboard" : "/login"} replace />;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/module/:moduleId" element={<ProtectedRoute><ModulePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}