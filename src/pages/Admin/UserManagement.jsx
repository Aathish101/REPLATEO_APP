import React from 'react';
import { 
  Users, Shield, CheckCircle, UserPlus, Edit, Search, Filter, 
  MoreVertical, User, Activity 
} from 'lucide-react';

const UserManagement = () => {
  // --- Mock Data ---
  const users = [
    { id: 1, name: 'John Anderson', email: 'john@replateo.com', role: 'Admin', status: 'Active', joined: '2025-08-15', lastActive: '2026-01-22' },
    { id: 2, name: 'Grand Meridian Hotel', email: 'contact@grandmeridian.com', role: 'Donor', status: 'Active', joined: '2025-09-20', lastActive: '2026-01-22' },
    { id: 3, name: 'Hope Foundation NGO', email: 'info@hopefoundation.org', role: 'Receiver', status: 'Active', joined: '2025-09-25', lastActive: '2026-01-21' },
    { id: 4, name: 'Sarah Mitchell', email: 'sarah@replateo.com', role: 'Admin', status: 'Active', joined: '2025-10-01', lastActive: '2026-01-22' },
    { id: 5, name: 'Ocean View Resort', email: 'admin@oceanview.com', role: 'Donor', status: 'Pending', joined: '2026-01-20', lastActive: '2026-01-20' },
    { id: 6, name: 'Sunshine Farms', email: 'contact@sunshinefarms.com', role: 'Receiver', status: 'Active', joined: '2025-11-10', lastActive: '2026-01-21' },
    { id: 7, name: 'CompostPro Industries', email: 'info@compostpro.com', role: 'Receiver', status: 'Active', joined: '2025-11-15', lastActive: '2026-01-22' },
    { id: 8, name: 'City Catering Co.', email: 'hello@citycatering.com', role: 'Donor', status: 'Pending', joined: '2026-01-18', lastActive: '2026-01-18' },
  ];

  const activities = [
    { text: 'Approved donor verification Grand Meridian Hotel', user: 'John Anderson', time: '2 hours ago' },
    { text: 'Updated pickup schedule Ocean View Resort', user: 'Sarah Mitchell', time: '4 hours ago' },
    { text: 'Created pickup request PR-001', user: 'Grand Meridian Hotel', time: '5 hours ago' },
    { text: 'Generated monthly report June 2026', user: 'John Anderson', time: '1 day ago' },
    { text: 'Confirmed food receipt 120 kg', user: 'Hope Foundation NGO', time: '1 day ago' },
  ];

  // Helper for Role Badges
  const getRoleStyle = (role) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Donor': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Receiver': return 'bg-green-100 text-green-600 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage users, roles, and permissions</p>
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
          <div><p className="text-gray-500 text-sm font-medium">Total Users</p><h3 className="text-3xl font-bold text-gray-800 mt-1">236</h3></div>
          <div className="p-3 bg-white rounded-full border border-gray-100"><Users size={24} className="text-orange-500" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-gray-500 text-sm font-medium">Admins</p><h3 className="text-3xl font-bold text-purple-600 mt-1">5</h3></div>
          <div className="p-3 bg-white rounded-full border border-gray-100"><Shield size={24} className="text-purple-600" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-gray-500 text-sm font-medium">Active Users</p><h3 className="text-3xl font-bold text-green-600 mt-1">221</h3></div>
          <div className="p-3 bg-white rounded-full border border-gray-100"><CheckCircle size={24} className="text-green-600" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-gray-500 text-sm font-medium">Pending Approval</p><h3 className="text-3xl font-bold text-yellow-600 mt-1">15</h3></div>
          <div className="p-3 bg-white rounded-full border border-gray-100"><UserPlus size={24} className="text-yellow-600" /></div>
        </div>
      </div>

      {/* --- All Users Table --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">All Users</h2>
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
              {users.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.role === 'Admin' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                        {item.role === 'Admin' ? <Shield size={14}/> : <User size={14}/>}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleStyle(item.role)}`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                       {item.status === 'Active' ? <CheckCircle size={12}/> : <Activity size={12}/>}
                       {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.joined}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.lastActive}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-orange-500 hover:text-orange-700 px-3 py-1 rounded-lg border border-orange-200 hover:border-orange-500 text-xs font-medium transition-all">
                      Edit
                    </button>
                    {item.status === 'Pending' && (
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition-all">
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Recent Activity Log --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
           <Activity size={20} className="text-orange-500"/>
           Recent Activity Log
        </h2>
        <div className="space-y-4">
          {activities.map((act, index) => (
             <div key={index} className="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-100">
               <div className="text-sm text-gray-800">
                 <span className="font-bold text-orange-600">{act.user}</span> {act.text.replace(act.user, '')}
               </div>
               <div className="text-xs text-gray-400 mt-1">{act.time}</div>
             </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default UserManagement;