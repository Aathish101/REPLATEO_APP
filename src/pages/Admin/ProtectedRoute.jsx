import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ requireAdmin = false }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <p className="p-6">Checking access...</p>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Admin-only route
  if (requireAdmin && user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        🚫 Admin access only
      </div>
    );
  }

  return <Outlet />;
}
