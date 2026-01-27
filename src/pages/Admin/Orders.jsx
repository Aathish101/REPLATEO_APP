import React from 'react';
import { Package, TrendingUp, CheckCircle, DollarSign, Plus } from 'lucide-react';

const Orders = () => {
  // Mock Data matching your screenshot
  const orders = [
    { id: 'ORD-2401', buyer: 'Sunshine Farms', type: 'Farmer', phone: '+1 234-567-8902', quantity: '250 kg', amount: '$125', status: 'Paid', progress: 100, progressStage: 'Delivered', date: '2026-01-22' },
    { id: 'ORD-2402', buyer: 'Green Valley Agriculture', type: 'Farmer', phone: '+1 234-567-8903', quantity: '180 kg', amount: '$90', status: 'Paid', progress: 65, progressStage: 'In Transit', date: '2026-01-23' },
    { id: 'ORD-2403', buyer: 'Urban Garden Co-op', type: 'Co-op', phone: '+1 234-567-8906', quantity: '75 kg', amount: '$37.5', status: 'Pending', progress: 0, progressStage: 'Preparing', date: '2026-01-24' },
    { id: 'ORD-2404', buyer: 'Organic Meadows Farm', type: 'Farmer', phone: '+1 234-567-8910', quantity: '150 kg', amount: '$75', status: 'Paid', progress: 30, progressStage: 'In Transit', date: '2026-01-25' },
    { id: 'ORD-2405', buyer: 'EcoGarden Solutions', type: 'Business', phone: '+1 234-567-8911', quantity: '100 kg', amount: '$50', status: 'Paid', progress: 100, progressStage: 'Delivered', date: '2026-01-21' },
    { id: 'ORD-2406', buyer: 'Happy Harvest Farm', type: 'Farmer', phone: '+1 234-567-8912', quantity: '200 kg', amount: '$100', status: 'Pending', progress: 0, progressStage: 'Preparing', date: '2026-01-26' },
  ];

  return (
    <div className="space-y-6">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders & Distribution</h1>
          <p className="text-gray-500 text-sm mt-1">Manage manure orders and delivery tracking</p>
        </div>
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">
            <Plus size={18} />
            Create New Order
          </button>
        </div>
      </div>

      {/* --- Stats Row (4 Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div><p className="text-gray-500 text-sm font-medium">Total Orders</p><h3 className="text-3xl font-bold text-gray-800 mt-1">247</h3></div>
          <div className="p-3 bg-orange-50 text-orange-500 rounded-xl"><Package size={28} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div><p className="text-gray-500 text-sm font-medium">In Progress</p><h3 className="text-3xl font-bold text-blue-600 mt-1">12</h3></div>
          <div className="p-3 bg-blue-50 text-blue-500 rounded-xl"><TrendingUp size={28} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div><p className="text-gray-500 text-sm font-medium">Completed</p><h3 className="text-3xl font-bold text-green-600 mt-1">232</h3></div>
          <div className="p-3 bg-green-50 text-green-500 rounded-xl"><CheckCircle size={28} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div><p className="text-gray-500 text-sm font-medium">Total Revenue</p><h3 className="text-3xl font-bold text-emerald-600 mt-1">$8,240</h3></div>
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl"><DollarSign size={28} /></div>
        </div>
      </div>

      {/* --- All Orders Table --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">All Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold tracking-wider">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Buyer Details</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4 w-1/4">Delivery Progress</th>
                <th className="px-6 py-4">Expected Delivery</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-orange-500">{item.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.buyer}</p>
                      <p className="text-xs text-gray-500">{item.type}</p>
                      <p className="text-xs text-gray-400">{item.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-600">{item.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">{item.progressStage}</span>
                        <span className="font-medium text-orange-500">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-orange-500 hover:text-orange-700 text-sm font-medium border border-orange-200 hover:border-orange-500 px-3 py-1 rounded-lg transition-all">
                      Track
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

export default Orders;