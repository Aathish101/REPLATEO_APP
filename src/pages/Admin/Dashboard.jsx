// src/components/admin/Dashboard.jsx

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
// Import icons one by one to prevent loading issues
import { Trash2, Recycle, Leaf, Cloud, Users, UserCheck, MoreVertical, HelpCircle } from 'lucide-react';

// --- Internal StatCard Component (Included here for simplicity) ---
const StatCard = ({ title, value, unit, change, icon: Icon, color, iconColor }) => {
  // Safety Check: Use HelpCircle if the intended icon fails to load to prevent crashes
  const ValidIcon = Icon || HelpCircle;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">
          {value} <span className="text-base font-normal text-gray-500">{unit}</span>
        </h3>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
          </span>
          <span className="text-xs text-gray-400 ml-2">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${iconColor || 'bg-orange-50'}`}>
        <ValidIcon className={`w-6 h-6 ${color || 'text-orange-500'}`} />
      </div>
    </div>
  );
};

// --- Mock Data for Charts and Tables ---
const trendData = [
  { name: 'Jan', value: 820 }, { name: 'Feb', value: 920 }, { name: 'Mar', value: 1150 },
  { name: 'Apr', value: 1050 }, { name: 'May', value: 1280 }, { name: 'Jun', value: 1420 },
];
const distributionData = [
  { name: 'Redistributed', value: 64, color: '#F97316' },
  { name: 'Composted', value: 36, color: '#FDBA74' },
];
const donorCategoryData = [
  { name: 'Hotels', value: 4500 }, { name: 'Restaurants', value: 3800 },
  { name: 'Events', value: 2900 }, { name: 'Catering', value: 1600 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      </div>

      {/* --- Top 6 Key Metrics Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Food Waste Collected" value="12,847" unit="kg" change={12} icon={Trash2} color="text-orange-600" iconColor="bg-orange-100" />
        <StatCard title="Food Redistributed" value="8,234" unit="kg" change={8} icon={Recycle} color="text-green-600" iconColor="bg-green-100" />
        <StatCard title="Manure Produced" value="4,613" unit="kg" change={15} icon={Leaf} color="text-emerald-600" iconColor="bg-emerald-100" />
        <StatCard title="CO₂ Emissions Reduced" value="32.5" unit="tons" change={10} icon={Cloud} color="text-blue-600" iconColor="bg-blue-100" />
        <StatCard title="Active Donors" value="147" unit="" change={5} icon={Users} color="text-purple-600" iconColor="bg-purple-100" />
        <StatCard title="Active Receivers" value="89" unit="" change={3} icon={UserCheck} color="text-indigo-600" iconColor="bg-indigo-100" />
      </div>

      {/* --- Charts Row (Trend & Distribution) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Food Waste Collection Trend</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ color: '#F97316' }} />
                <Line type="monotone" dataKey="value" stroke="#F97316" strokeWidth={3} dot={{ r: 4, fill: '#F97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Food Distribution</h2>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {distributionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold text-gray-800">64%</span>
              <span className="text-xs text-gray-400">Redistributed</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Bar Chart (Top Donors) --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Donor Categories</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donorCategoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} hide />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#F97316" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Bottom Tables Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Collections */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-1">
          <div className="flex justify-between items-center mb-4"><h2 className="text-lg font-semibold text-gray-800">Recent Collections</h2><button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button></div>
          <div className="space-y-4">
            {[{ name: 'Grand Meridian Hotel', date: '2026-01-22', weight: '45 kg', status: 'Collected' }, { name: 'Bella Vista Restaurant', date: '2026-01-22', weight: '28 kg', status: 'Collected' }].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div><h4 className="font-medium text-gray-800 text-sm">{item.name}</h4><p className="text-xs text-gray-400">{item.date}</p></div>
                <div className="text-right"><span className="block font-bold text-orange-500 text-sm">{item.weight}</span><span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{item.status}</span></div>
              </div>
            ))}
          </div>
        </div>
        {/* Pending Pickups */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-1">
          <div className="flex justify-between items-center mb-4"><h2 className="text-lg font-semibold text-gray-800">Pending Pickups</h2><button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button></div>
          <div className="space-y-4">
            {[{ name: 'Ocean View Resort', loc: 'Coastal Road', weight: '65 kg', time: '2:30 PM' }, { name: 'City Center Events', loc: 'Downtown', weight: '95 kg', time: '4:00 PM' }].map((item, i) => (
              <div key={i} className="bg-orange-50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all">
                <div className="flex justify-between mb-2"><h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4><span className="text-orange-600 font-bold text-sm">{item.weight}</span></div>
                <div className="flex justify-between text-xs text-gray-500"><span>{item.loc}</span><span>{item.time}</span></div>
              </div>
            ))}
          </div>
        </div>
        {/* Latest Manure Sales */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-1">
          <div className="flex justify-between items-center mb-4"><h2 className="text-lg font-semibold text-gray-800">Latest Manure Sales</h2><button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button></div>
          <div className="space-y-4">
            {[{ name: 'Sunshine Farms', weight: '250 kg', price: '$125', status: 'Delivered', color: 'bg-green-100 text-green-700' }, { name: 'Green Valley Agri', weight: '180 kg', price: '$90', status: 'In Transit', color: 'bg-blue-100 text-blue-700' }].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 border-b border-gray-50 last:border-0">
                <div><h4 className="font-medium text-gray-800 text-sm">{item.name}</h4><p className="text-xs text-gray-400">{item.weight}</p></div>
                <div className="text-right"><div className="font-bold text-gray-800 text-sm">{item.price}</div><span className={`text-[10px] px-2 py-0.5 rounded-full ${item.color}`}>{item.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;