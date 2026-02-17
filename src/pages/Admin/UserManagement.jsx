//usermanagement.jsx:

// src/components/admin/UserManagement.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  Shield,
  CheckCircle,
  UserPlus,
  Search,
  Filter,
  User,
  Activity,
  Trash2,
  X,
} from "lucide-react";

import { db } from "../../firebase"; // adjust path if needed
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const UserManagement = () => {
  // ---------- STATE ----------
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // edit modal state
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // ---------- FIRESTORE: USERS ----------
  useEffect(() => {
    const usersRef = collection(db, "users");

    const unsubscribe = onSnapshot(
      usersRef,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => {
          const raw = docSnap.data();
          return {
            id: docSnap.id,
            name: raw.name || "Unnamed User",
            email: raw.email || "-",
            role: raw.role || "user", // "ngo" / "Receiver" / etc – whatever you store
            status: raw.status || "Pending",
            joined: raw.joinedDate || "-",
            lastActive: raw.lastActive || "-",
          };
        });

        setUsers(list);
        setLoadingUsers(false);
      },
      (err) => {
        console.error("Error loading users:", err);
        setLoadingUsers(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ---------- FIRESTORE: ACTIVITIES ----------
  useEffect(() => {
    const activitiesRef = collection(db, "activities");
    const q = query(activitiesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const logs = snapshot.docs.map((docSnap) => {
          const raw = docSnap.data();
          return {
            id: docSnap.id,
            text: raw.text || "",
            user: raw.userName || "System",
            time: raw.timeLabel || "",
          };
        });

        setActivities(logs);
        setLoadingActivities(false);
      },
      (err) => {
        console.error("Error loading activities:", err);
        setLoadingActivities(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ---------- ROLE BADGE STYLES ----------
  const getRoleStyle = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "Donor":
      case "ngo":
      case "user":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "Receiver":
        return "bg-green-100 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  // ---------- FILTERED USERS ----------
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "All" ? true : u.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ? true : u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  // ---------- STATS ----------
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const admins = users.filter((u) => u.role === "Admin").length;
    const activeUsers = users.filter((u) => u.status === "Active").length;
    const pending = users.filter((u) => u.status === "Pending").length;

    return { totalUsers, admins, activeUsers, pending };
  }, [users]);

  // ---------- EDIT HANDLERS ----------
  const openEditModal = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditName("");
    setEditEmail("");
    setSavingEdit(false);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    try {
      setSavingEdit(true);
      const ref = doc(db, "users", editingUser.id);
      await updateDoc(ref, {
        name: editName,
        email: editEmail,
      });
      closeEditModal(); // snapshot will refresh table
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Check console for details.");
      setSavingEdit(false);
    }
  };

  // ---------- DELETE HANDLER ----------
  const handleDeleteUser = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;
    try {
      const ref = doc(db, "users", id);
      await deleteDoc(ref);
      // snapshot will auto-update the table
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Check console for details.");
    }
  };

  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage users, roles, and permissions
          </p>
          {(loadingUsers || loadingActivities) && (
            <p className="text-xs text-gray-400 mt-1">
              Syncing users & activity from Firestore…
            </p>
          )}
        </div>
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">
            <UserPlus size={18} />
            + Add New User
          </button>
        </div>
      </div>

      {/* --- Stats Row (4 Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {stats.totalUsers}
            </h3>
          </div>
          <div className="p-3 bg-white rounded-full border border-gray-100">
            <Users size={24} className="text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Admins</p>
            <h3 className="text-3xl font-bold text-purple-600 mt-1">
              {stats.admins}
            </h3>
          </div>
          <div className="p-3 bg-white rounded-full border border-gray-100">
            <Shield size={24} className="text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Users</p>
            <h3 className="text-3xl font-bold text-green-600 mt-1">
              {stats.activeUsers}
            </h3>
          </div>
          <div className="p-3 bg-white rounded-full border border-gray-100">
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">
              Pending Approval
            </p>
            <h3 className="text-3xl font-bold text-yellow-600 mt-1">
              {stats.pending}
            </h3>
          </div>
          <div className="p-3 bg-white rounded-full border border-gray-100">
            <UserPlus size={24} className="text-yellow-600" />
          </div>
        </div>
      </div>

      {/* --- All Users Table + Filters --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-gray-800">All Users</h2>

          <div className="flex flex-col sm:flex-row gap-3 md:items-center">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search name or email..."
                className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Donor">Donor</option>
              <option value="Receiver">Receiver</option>
              <option value="ngo">ngo</option>
              <option value="user">user</option>
            </select>

            {/* Status Filter */}
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.role === "Admin"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-orange-100 text-orange-600"
                          }`}
                      >
                        {item.role === "Admin" ? (
                          <Shield size={14} />
                        ) : (
                          <User size={14} />
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-800">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleStyle(
                        item.role
                      )}`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.joined}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.lastActive}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {/* EDIT */}
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-orange-500 hover:text-orange-700 px-3 py-1 rounded-lg border border-orange-200 hover:border-orange-500 text-xs font-medium transition-all"
                    >
                      Edit
                    </button>
                    {/* DELETE */}
                    <button
                      onClick={() => handleDeleteUser(item.id)}
                      className="text-red-500 hover:text-red-700 px-3 py-1 rounded-lg border border-red-200 hover:border-red-500 text-xs font-medium transition-all flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!loadingUsers && filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-sm text-gray-400"
                  >
                    No users match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Recent Activity Log --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Activity size={20} className="text-orange-500" />
          Recent Activity Log
        </h2>
        {loadingActivities && (
          <p className="text-xs text-gray-400 mb-4">
            Loading activity from Firestore…
          </p>
        )}
        <div className="space-y-4">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="text-sm text-gray-800">
                <span className="font-bold text-orange-600">{act.user}</span>{" "}
                {act.text.replace(act.user || "", "").trim()}
              </div>
              <div className="text-xs text-gray-400 mt-1">{act.time}</div>
            </div>
          ))}

          {!loadingActivities && activities.length === 0 && (
            <p className="text-sm text-gray-400">
              No activity yet. Add docs to the{" "}
              <span className="font-mono">activities</span> collection to see
              logs here.
            </p>
          )}
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={closeEditModal}
          />
          <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Edit User
              </h3>
              <button
                onClick={closeEditModal}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                disabled={savingEdit}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 disabled:opacity-60"
                disabled={savingEdit}
              >
                {savingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;