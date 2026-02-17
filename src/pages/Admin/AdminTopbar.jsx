import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function AdminTopbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later you can add real auth logout here
    navigate("/admin/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Admin Panel</h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:text-red-800"
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
}
