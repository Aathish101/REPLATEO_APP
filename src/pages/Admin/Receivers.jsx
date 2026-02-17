import React, { useEffect, useState } from "react";
import { Users, Heart, Tractor, Leaf, Plus } from "lucide-react";
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { db } from "../../firebase";

const Receivers = () => {
  const [receivers, setReceivers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH RECEIVERS (LIVE)
  ========================= */
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("role", "==", "receiver")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        foodReceivedKg: 0,
        manureOrderedKg: 0,
        availability: "Available",
        ...doc.data(),
      }));

      setReceivers(list);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-orange-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  /* =========================
     STATS
  ========================= */
  const total = receivers.length;
  const ngos = receivers.filter(r => r.type === "NGO").length;
  const farmers = receivers.filter(r => r.type === "Farmer").length;
  const compost = receivers.filter(r => r.type === "Compost Unit").length;

  /* =========================
     STYLE HELPER
  ========================= */
  const getTypeStyles = (type) => {
    switch (type) {
      case "NGO":
        return { bg: "bg-pink-100", text: "text-pink-600", icon: Heart, iconBg: "bg-pink-50" };
      case "Farmer":
        return { bg: "bg-green-100", text: "text-green-600", icon: Tractor, iconBg: "bg-green-50" };
      case "Compost Unit":
        return { bg: "bg-orange-100", text: "text-orange-600", icon: Leaf, iconBg: "bg-orange-50" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600", icon: Users, iconBg: "bg-gray-50" };
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Receiver Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            NGOs, Farmers & Compost Units
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
          <Plus size={18} /> Add New Receiver
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Receivers" value={total} icon={Users} />
        <Stat label="NGOs" value={ngos} icon={Heart} color="pink" />
        <Stat label="Farmers" value={farmers} icon={Tractor} color="green" />
        <Stat label="Compost Units" value={compost} icon={Leaf} color="orange" />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">All Receivers</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Food Received</th>
                <th className="px-6 py-4">Manure Ordered</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {receivers.map((r) => {
                const styles = getTypeStyles(r.type);
                const Icon = styles.icon;

                return (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center`}>
                        <Icon size={18} className={styles.text} />
                      </div>
                      {r.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${styles.bg} ${styles.text}`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{r.location || "—"}</td>
                    <td className="px-6 py-4 font-bold">
                      {r.foodReceivedKg} kg
                    </td>
                    <td className="px-6 py-4 font-bold text-orange-500">
                      {r.manureOrderedKg} kg
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${r.availability === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {r.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {r.contact || "—"}
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

/* SMALL STAT CARD */
const Stat = ({ label, value, icon: Icon, color = "orange" }) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className={`text-3xl font-bold text-${color}-600 mt-1`}>
        {value}
      </h3>
    </div>
    <Icon className={`text-${color}-500`} size={28} />
  </div>
);

export default Receivers;
