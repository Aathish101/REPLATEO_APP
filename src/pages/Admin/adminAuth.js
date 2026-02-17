import Dashboard from "./Dashboard";
import Donors from "./Donors";
import Receivers from "./Receivers";
import Orders from "./Orders";
import Analytics from "./Analytics";
import UserManagement from "./UserManagement";
import Settings from "./Settings";
import FoodWasteCollection from "./FoodWasteCollection";

import ProtectedRoute from "./ProtectedRoute";

export const adminRoutes = [
  {
    element: <ProtectedRoute />, // logged-in admin area
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "food-waste", element: <FoodWasteCollection /> },
      { path: "donors", element: <Donors /> },
      { path: "receivers", element: <Receivers /> },
      { path: "orders", element: <Orders /> },
      { path: "analytics", element: <Analytics /> },
      { path: "users", element: <UserManagement /> },
    ],
  },
  {
    element: <ProtectedRoute adminOnly />, // 🔐 ADMIN ONLY
    children: [
      { path: "settings", element: <Settings /> },
    ],
  },
];
