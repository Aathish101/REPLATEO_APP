import React from 'react';
import { Filter, Plus, Calendar, MapPin, Truck, Eye } from 'lucide-react';

const FoodWasteCollection = () => {
  // Mock Data matching your screenshot
  const requests = [
    { id: 'PR-001', donor: 'Grand Meridian Hotel', location: '123 Main St, Downtown', date: '2026-01-22', time: '2:30 PM', quantity: '45 kg', driver: 'John Smith', status: 'Assigned' },
    { id: 'PR-002', donor: 'Ocean View Resort', location: '456 Coastal Road', date: '2026-01-22', time: '4:00 PM', quantity: '65 kg', driver: '-', status: 'Pending' },
    { id: 'PR-003', donor: 'City Center Events', location: '789 Downtown Ave', date: '2026-01-22', time: '5:15 PM', quantity: '95 kg', driver: '-', status: 'Pending' },
    { id: 'PR-004', donor: 'Bella Vista Restaurant', location: '321 Park Lane', date: '2026-01-21', time: '3:00 PM', quantity: '28 kg', driver: 'Sarah Johnson', status: 'Collected' },
    { id: 'PR-005', donor: 'Tech Summit 2026', location: 'Convention Center', date: '2026-01-21', time: '7:00 PM', quantity: '120 kg', driver: 'Mike Davis', status: 'Collected' },
    { id: 'PR-006', donor: 'Green Leaf Cafe', location: '555 Park Street', date: '2026-01-20', time: '6:30 PM', quantity: '18 kg', driver: '-', status: 'Cancelled' },
    { id: 'PR-007', donor: 'Downtown Bistro', location: '888 Commerce St', date: '2026-01-21', time: '4:45 PM', quantity: '32 kg', driver: 'John Smith', status: 'Collected' },
    { id: 'PR-008', donor: 'Royal Palace Hotel', location: '999 Luxury Ave', date: '2026-01-23', time: '11:00 AM', quantity: '78 kg', driver: 'Sarah Johnson', status: 'Assigned' },
  ];

  // Helper to get badge colors based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Assigned': return 'bg-blue-100 text-blue-600';
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      case 'Collected': return 'bg-green-100 text-green-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Food Waste Collection</h1>
          <p className="text-gray-500 text-sm mt-1">Manage pickup requests and collection schedules</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">
            <Plus size={18} />
            New Pickup Request
          </button>
        </div>
      </div>

      {/* --- Stats Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Today's Pickups</p>
          <h3 className="text-3xl font-bold text-orange-500 mt-2">8</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Pending</p>
          <h3 className="text-3xl font-bold text-yellow-500 mt-2">2</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">In Progress</p>
          <h3 className="text-3xl font-bold text-blue-500 mt-2">3</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium">Completed Today</p>
          <h3 className="text-3xl font-bold text-green-500 mt-2">3</h3>
        </div>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">All Pickup Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold tracking-wider">
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Donor</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-orange-500">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.donor}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin size={14} className="text-gray-400" />
                      {item.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {item.date}</span>
                      <span className="text-xs text-gray-400 ml-4">{item.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.driver !== '-' ? (
                      <div className="flex items-center gap-2">
                         <span className="text-gray-600">{item.driver}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-orange-500 hover:text-orange-700 text-sm font-medium border border-orange-200 hover:border-orange-500 px-3 py-1 rounded-lg transition-all">
                      View Details
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

export default FoodWasteCollection;