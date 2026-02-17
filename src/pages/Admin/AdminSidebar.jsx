import { NavLink } from "react-router-dom";
// ✅ Import 'Settings' icon
import { LayoutDashboard, Trash2, Building2, Users, Package, List, BarChart3, Settings } from 'lucide-react';

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all font-medium ${
      isActive
        ? "bg-orange-500 text-white shadow-md shadow-orange-200"
        : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
    }`;

  return (
    <aside className="w-64 bg-white shadow-xl h-screen flex flex-col fixed left-0 top-0 z-10 border-r border-gray-100">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
          Replateo<span className="text-gray-800">Admin</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {/* ... (Keep existing links) ... */}
        <NavLink to="/admin/dashboard" className={linkClass}><LayoutDashboard size={20} />Dashboard Overview</NavLink>
        <NavLink to="/admin/food-waste" className={linkClass}><Trash2 size={20} />Food Waste Collection</NavLink>
        <NavLink to="/admin/donors" className={linkClass}><Building2 size={20} />Donors</NavLink>
        <NavLink to="/admin/receivers" className={linkClass}><Users size={20} />Receivers</NavLink>
        <NavLink to="/admin/orders" className={linkClass}><Package size={20} />Orders & Distribution</NavLink>
        <NavLink to="/admin/analytics" className={linkClass}><BarChart3 size={20} />Analytics & Reports</NavLink>
        
        <NavLink to="/admin/users" className={linkClass}><Users size={20} />User Management</NavLink>

        {/* ✅ NEW: Settings Link */}
        <NavLink to="/admin/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">A</div>
              <div><p className="text-sm font-bold text-gray-800">Admin User</p><p className="text-xs text-gray-500">Super Admin</p></div>
          </div>
      </div>
    </aside>
  );
}