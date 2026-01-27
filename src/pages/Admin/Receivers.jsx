import React from 'react';
import { Users, Heart, Tractor, Leaf, Filter, Plus } from 'lucide-react';

const Receivers = () => {
  // Mock Data matching your screenshot
  const receivers = [
    { id: 1, name: 'Hope Foundation NGO', type: 'NGO', location: 'Downtown', foodReceived: '3,250 kg', manureOrdered: '0 kg', availability: 'Available', contact: '+1 234-567-8901' },
    { id: 2, name: 'Sunshine Farms', type: 'Farmer', location: 'Rural County', foodReceived: '450 kg', manureOrdered: '850 kg', availability: 'Available', contact: '+1 234-567-8902' },
    { id: 3, name: 'Green Valley Agriculture', type: 'Farmer', location: 'Green Valley', foodReceived: '280 kg', manureOrdered: '620 kg', availability: 'Available', contact: '+1 234-567-8903' },
    { id: 4, name: 'CompostPro Industries', type: 'Compost Unit', location: 'Industrial Zone', foodReceived: '4,580 kg', manureOrdered: '0 kg', availability: 'Available', contact: '+1 234-567-8904' },
    { id: 5, name: 'Community Kitchen', type: 'NGO', location: 'City Center', foodReceived: '2,840 kg', manureOrdered: '0 kg', availability: 'Busy', contact: '+1 234-567-8905' },
    { id: 6, name: 'Urban Garden Co-op', type: 'Farmer', location: 'Urban District', foodReceived: '150 kg', manureOrdered: '320 kg', availability: 'Available', contact: '+1 234-567-8906' },
    { id: 7, name: 'EcoCompost Solutions', type: 'Compost Unit', location: 'West Side', foodReceived: '5,230 kg', manureOrdered: '0 kg', availability: 'Available', contact: '+1 234-567-8907' },
    { id: 8, name: 'Harvest Hope NGO', type: 'NGO', location: 'East District', foodReceived: '1,920 kg', manureOrdered: '0 kg', availability: 'Available', contact: '+1 234-567-8908' },
  ];

  // Helper for styles based on type
  const getTypeStyles = (type) => {
    switch (type) {
      case 'NGO': return { bg: 'bg-pink-100', text: 'text-pink-600', icon: Heart, iconColor: 'text-pink-500', iconBg: 'bg-pink-50' };
      case 'Farmer': return { bg: 'bg-green-100', text: 'text-green-600', icon: Tractor, iconColor: 'text-green-500', iconBg: 'bg-green-50' };
      case 'Compost Unit': return { bg: 'bg-orange-100', text: 'text-orange-600', icon: Leaf, iconColor: 'text-orange-500', iconBg: 'bg-orange-50' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', icon: Users, iconColor: 'text-gray-500', iconBg: 'bg-gray-50' };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Receiver Management</h1>
          <p className="text-gray-500 text-sm mt-1">NGOs, Farmers & Compost Units</p>
        </div>
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">
            <Plus size={18} />
            Add New Receiver
          </button>
        </div>
      </div>

      {/* --- Top Stats Row (4 Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div><p className="text-gray-500 text-sm font-medium">Total Receivers</p><h3 className="text-3xl font-bold text-gray-800 mt-1">89</h3></div>
          <div className="p-3 bg-orange-50 text-orange-500 rounded-xl"><Users size={28} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div><p className="text-gray-500 text-sm font-medium">NGOs</p><h3 className="text-3xl font-bold text-pink-500 mt-1">32</h3></div>
          <div className="p-3 bg-pink-50 text-pink-500 rounded-xl"><Heart size={28} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div><p className="text-gray-500 text-sm font-medium">Farmers</p><h3 className="text-3xl font-bold text-green-500 mt-1">38</h3></div>
          <div className="p-3 bg-green-50 text-green-500 rounded-xl"><Tractor size={28} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div><p className="text-gray-500 text-sm font-medium">Compost Units</p><h3 className="text-3xl font-bold text-orange-500 mt-1">19</h3></div>
          <div className="p-3 bg-orange-50 text-orange-500 rounded-xl"><Leaf size={28} /></div>
        </div>
      </div>

      {/* --- Middle Stats Section (Distribution & Processing) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Food Distribution by Type */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-4">Food Distribution by Type</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-50 text-pink-500 rounded-lg"><Heart size={20} /></div>
                <span className="font-semibold text-gray-800">NGOs</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-gray-800">8,010 kg</span>
                <span className="text-xs text-gray-400">64% of total</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-500 rounded-lg"><Tractor size={20} /></div>
                <span className="font-semibold text-gray-800">Farmers</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-gray-800">880 kg</span>
                <span className="text-xs text-gray-400">7% of total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compost Processing */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-600 font-medium mb-4">Compost Processing</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><Leaf size={20} /></div>
                <span className="font-semibold text-gray-800">To Compost Units</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-gray-800">9,810 kg</span>
                <span className="text-xs text-gray-400">29% of total</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-500 rounded-lg"><Leaf size={20} /></div>
                <span className="font-semibold text-gray-800">Manure Ordered</span>
              </div>
              <div className="text-right">
                <span className="block font-bold text-gray-800">1,790 kg</span>
                <span className="text-xs text-gray-400">By farmers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- All Receivers Table --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">All Receivers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold tracking-wider">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Food Received</th>
                <th className="px-6 py-4">Manure Ordered</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {receivers.map((item) => {
                const styles = getTypeStyles(item.type);
                const Icon = styles.icon;
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center ${styles.iconColor}`}>
                          <Icon size={18} />
                        </div>
                        <span className="text-sm font-bold text-gray-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent ${styles.bg} ${styles.text}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.foodReceived}</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-500">{item.manureOrdered}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                         {item.availability === 'Available' ? '✔' : 'clock'} {item.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.contact}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-orange-500 hover:text-orange-700 text-sm font-medium border border-orange-200 hover:border-orange-500 px-3 py-1 rounded-lg transition-all">
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Receivers;