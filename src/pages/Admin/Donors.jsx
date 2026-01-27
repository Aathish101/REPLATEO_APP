import React from 'react';
import { Building2, CheckCircle, Award, TrendingUp, Hotel, Utensils, CalendarDays, ChefHat, Star } from 'lucide-react';

const Donors = () => {
  // Mock Data matching your screenshot
  const donors = [
    { id: 1, name: 'Grand Meridian Hotel', type: 'Hotel', total: '2,847 kg', avg: '285 kg/month', last: '2026-01-22', rating: 4.9, status: 'Verified', isTop: true },
    { id: 2, name: 'Ocean View Resort', type: 'Hotel', total: '2,156 kg', avg: '215 kg/month', last: '2026-01-22', rating: 4.8, status: 'Verified', isTop: true },
    { id: 3, name: 'Bella Vista Restaurant', type: 'Restaurant', total: '1,843 kg', avg: '184 kg/month', last: '2026-01-22', rating: 4.7, status: 'Verified', isTop: false },
    { id: 4, name: 'Tech Summit 2026', type: 'Event', total: '1,520 kg', avg: '152 kg/month', last: '2026-01-21', rating: 4.9, status: 'Verified', isTop: false },
    { id: 5, name: 'Downtown Bistro', type: 'Restaurant', total: '1,234 kg', avg: '123 kg/month', last: '2026-01-21', rating: 4.6, status: 'Verified', isTop: false },
    { id: 6, name: 'Green Leaf Cafe', type: 'Restaurant', total: '987 kg', avg: '98 kg/month', last: '2026-01-20', rating: 4.5, status: 'Verified', isTop: false },
    { id: 7, name: 'Royal Palace Hotel', type: 'Hotel', total: '2,543 kg', avg: '254 kg/month', last: '2026-01-19', rating: 4.8, status: 'Verified', isTop: true },
    { id: 8, name: 'City Catering Co.', type: 'Catering', total: '1,654 kg', avg: '165 kg/month', last: '2026-01-18', rating: 4.4, status: 'Pending', isTop: false },
  ];

  return (
    <div className="space-y-6">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Donor Management</h1>
          <p className="text-gray-500 text-sm mt-1">Hotels, Events, Restaurants & Catering Services</p>
        </div>
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">
            + Add New Donor
          </button>
        </div>
      </div>

      {/* --- Top Stats Row (4 Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Donors</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-2">147</h3>
          </div>
          <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
            <Building2 size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
           <div>
            <p className="text-gray-500 text-sm font-medium">Verified Donors</p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">132</h3>
          </div>
          <div className="p-3 bg-green-50 text-green-500 rounded-lg">
            <CheckCircle size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
           <div>
            <p className="text-gray-500 text-sm font-medium">Top Donors</p>
            <h3 className="text-3xl font-bold text-orange-600 mt-2">12</h3>
          </div>
          <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
            <Award size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
           <div>
            <p className="text-gray-500 text-sm font-medium">New This Month</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">8</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* --- Category Cards Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Hotel className="text-orange-500 w-5 h-5" />
            <span className="text-gray-600 font-medium">Hotels</span>
          </div>
          <h4 className="text-2xl font-bold text-orange-600">42</h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Utensils className="text-blue-500 w-5 h-5" />
            <span className="text-gray-600 font-medium">Restaurants</span>
          </div>
          <h4 className="text-2xl font-bold text-blue-600">68</h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="text-purple-500 w-5 h-5" />
            <span className="text-gray-600 font-medium">Events</span>
          </div>
          <h4 className="text-2xl font-bold text-purple-600">21</h4>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <ChefHat className="text-green-500 w-5 h-5" />
            <span className="text-gray-600 font-medium">Catering</span>
          </div>
          <h4 className="text-2xl font-bold text-green-600">16</h4>
        </div>
      </div>

      {/* --- All Donors Table --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">All Donors</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold tracking-wider">
                <th className="px-6 py-4">Donor Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Total Donated</th>
                <th className="px-6 py-4">Monthly Avg</th>
                <th className="px-6 py-4">Last Donation</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donors.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        {item.isTop && <span className="text-[10px] text-orange-600 font-medium flex items-center gap-1"><Award size={10}/> Top Donor</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.avg}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.last}</td>
                  <td className="px-6 py-4 text-sm font-medium text-orange-500 flex items-center gap-1">
                    {item.rating} <span className="text-gray-400 text-xs font-normal">/ 5.0</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.status === 'Verified' ? <CheckCircle size={12}/> : null}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-orange-500 hover:text-orange-700 text-sm font-medium border border-orange-200 hover:border-orange-500 px-3 py-1 rounded-lg transition-all">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donors;