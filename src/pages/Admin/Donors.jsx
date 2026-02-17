import React, { useState, useEffect } from "react";
import {
  Building2, CheckCircle, Award, TrendingUp,
  Hotel, Utensils, CalendarDays, ChefHat
} from "lucide-react";

import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { db } from "../../firebase";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DONORS (REAL DATA)
  ========================= */
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("role", "==", "donor")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          rating: 4.5,          // default (safe)
          total: "—",           // optional future calc
          avg: "—",
          last: "—",
          isTop: false,
          ...doc.data(),
        }));

        setDonors(list);
        setLoading(false);
      },
      (err) => {
        console.error("Error loading donors:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
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
  const verifiedCount = donors.filter(d => d.status === "Verified").length;
  const topCount = donors.filter(d => d.isTop).length;

  const byType = (type) =>
    donors.filter(d => d.type === type).length;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Donor Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Hotels, Events, Restaurants & Catering Services
          </p>
        </div>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          + Add New Donor
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Total Donors" value={donors.length} icon={Building2} />
        <Stat title="Verified Donors" value={verifiedCount} icon={CheckCircle} color="green" />
        <Stat title="Top Donors" value={topCount} icon={Award} color="orange" />
        <Stat title="New This Month" value={donors.length ? 8 : 0} icon={TrendingUp} color="blue" />
      </div>

      {/* CATEGORY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Category label="Hotels" value={byType("Hotel")} icon={Hotel} />
        <Category label="Restaurants" value={byType("Restaurant")} icon={Utensils} />
        <Category label="Events" value={byType("Event")} icon={CalendarDays} />
        <Category label="Catering" value={byType("Catering")} icon={ChefHat} />
      </div>

      {/* DONORS TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">All Donors</h2>
        </div>

        <div className="overflow-x-auto">
          {donors.length === 0 ? (
            <p className="p-6 text-center text-gray-500">
              No donors found.
            </p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-4">Donor</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Total Donated</th>
                  <th className="px-6 py-4">Monthly Avg</th>
                  <th className="px-6 py-4">Last Donation</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {donors.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">{d.name}</td>
                    <td className="px-6 py-4">{d.type}</td>
                    <td className="px-6 py-4">{d.total}</td>
                    <td className="px-6 py-4">{d.avg}</td>
                    <td className="px-6 py-4">{d.last}</td>
                    <td className="px-6 py-4 text-orange-500">
                      {d.rating} / 5.0
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${d.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};

/* SMALL COMPONENTS */

const Stat = ({ title, value, icon: Icon, color = "orange" }) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</h3>
    </div>
    <Icon className={`text-${color}-500`} />
  </div>
);

const Category = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
    <div className="flex items-center gap-2 mb-1">
      <Icon size={18} className="text-orange-500" />
      <span className="text-gray-600">{label}</span>
    </div>
    <h4 className="text-2xl font-bold text-orange-600">{value}</h4>
  </div>
);

export default Donors;
