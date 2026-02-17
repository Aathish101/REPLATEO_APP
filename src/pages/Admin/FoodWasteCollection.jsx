import React, { useEffect, useState } from "react";
import { Filter, Plus, Calendar, MapPin } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const FoodWasteCollection = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    assigned: 0,
    collectedToday: 0,
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "food_listings"), (snapshot) => {
      const data = [];
      let today = 0;
      let pending = 0;
      let assigned = 0;
      let collectedToday = 0;

      const todayDate = new Date().toDateString();

      snapshot.forEach((doc) => {
        const d = doc.data();
        const dateObj = d.pickupDate?.toDate?.() || null;

        const item = {
          id: doc.id,
          donor: d.donorName,
          location: d.location,
          date: dateObj ? dateObj.toLocaleDateString() : "—",
          time: dateObj
            ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "—",
          quantity: `${d.quantityKg || 0} kg`,
          driver: d.driver || "-",
          status: capitalize(d.status),
        };

        data.push(item);

        if (dateObj && dateObj.toDateString() === todayDate) {
          today++;
          if (d.status === "collected") collectedToday++;
        }

        if (d.status === "pending") pending++;
        if (d.status === "assigned") assigned++;
      });

      setRequests(data);
      setStats({ today, pending, assigned, collectedToday });
    });

    return () => unsub();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Assigned": return "bg-blue-100 text-blue-600";
      case "Pending": return "bg-yellow-100 text-yellow-600";
      case "Collected": return "bg-green-100 text-green-600";
      case "Cancelled": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Food Waste Collection</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage pickup requests and collection schedules
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-gray-600">
            <Filter size={18} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
            <Plus size={18} /> New Pickup Request
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Today's Pickups" value={stats.today} color="text-orange-500" />
        <Stat label="Pending" value={stats.pending} color="text-yellow-500" />
        <Stat label="In Progress" value={stats.assigned} color="text-blue-500" />
        <Stat label="Completed Today" value={stats.collectedToday} color="text-green-500" />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">All Pickup Requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">Donor</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requests.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-orange-500">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 font-medium">{item.donor}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
                    <MapPin size={14} /> {item.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {item.date}
                      </span>
                      <span className="text-xs ml-4">{item.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">{item.quantity}</td>
                  <td className="px-6 py-4 text-gray-600">{item.driver}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
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

/* SMALL STAT CARD */
const Stat = ({ label, value, color }) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm">
    <p className="text-gray-500 text-sm">{label}</p>
    <h3 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h3>
  </div>
);

export default FoodWasteCollection;
