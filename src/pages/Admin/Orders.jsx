import React, { useEffect, useState } from "react";
import {
  Package, TrendingUp, CheckCircle, DollarSign, Plus
} from "lucide-react";

import {
  collection,
  onSnapshot
} from "firebase/firestore";
import { db } from "../../firebase";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    revenue: 0,
  });

  /* =========================
     FETCH ORDERS (LIVE)
  ========================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      let total = 0;
      let inProgress = 0;
      let completed = 0;
      let revenue = 0;

      const list = snapshot.docs.map((doc) => {
        const d = doc.data();

        total++;

        if (d.deliveryStage === "Delivered") completed++;
        if (d.deliveryStage !== "Delivered") inProgress++;

        if (d.paymentStatus === "Paid") {
          revenue += Number(d.amount || 0);
        }

        return {
          id: doc.id,
          buyer: d.buyerName,
          type: d.buyerType,
          phone: d.phone,
          quantity: `${d.quantityKg || 0} kg`,
          amount: `₹${d.amount || 0}`,
          status: d.paymentStatus || "Pending",
          progress: d.progress || 0,
          progressStage: d.deliveryStage || "Preparing",
          date: d.expectedDate || "—",
        };
      });

      setOrders(list);
      setStats({ total, inProgress, completed, revenue });
    });

    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders & Distribution</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage manure orders and delivery tracking
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
          <Plus size={18} /> Create New Order
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Orders" value={stats.total} icon={Package} />
        <Stat title="In Progress" value={stats.inProgress} icon={TrendingUp} color="blue" />
        <Stat title="Completed" value={stats.completed} icon={CheckCircle} color="green" />
        <Stat title="Total Revenue" value={`₹${stats.revenue}`} icon={DollarSign} color="emerald" />
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">All Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Buyer Details</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4">Delivery Progress</th>
                <th className="px-6 py-4">Expected Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-orange-500">
                    {o.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold">{o.buyer}</p>
                    <p className="text-xs text-gray-500">{o.type}</p>
                    <p className="text-xs text-gray-400">{o.phone}</p>
                  </td>
                  <td className="px-6 py-4">{o.quantity}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">
                    {o.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      o.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs mb-1 flex justify-between">
                      <span>{o.progressStage}</span>
                      <span className="text-orange-500">{o.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${o.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

/* STAT CARD */
const Stat = ({ title, value, icon: Icon, color = "orange" }) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className={`text-3xl font-bold text-${color}-600 mt-1`}>
        {value}
      </h3>
    </div>
    <Icon size={28} className={`text-${color}-500`} />
  </div>
);

export default Orders;
