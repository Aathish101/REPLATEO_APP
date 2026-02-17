// src/components/admin/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

import {
  Trash2, Recycle, Leaf, Cloud, Users, UserCheck, HelpCircle
} from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

/* =========================
   Stat Card
========================= */
const StatCard = ({ title, value, unit, icon: Icon, color, iconColor }) => {
  const ValidIcon = Icon || HelpCircle;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">
          {value} <span className="text-base font-normal text-gray-500">{unit}</span>
        </h3>
      </div>
      <div className={`p-3 rounded-xl ${iconColor}`}>
        <ValidIcon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  );
};

/* =========================
   Dashboard
========================= */
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalWaste: 0,
    redistributed: 0,
    composted: 0,
    donors: 0,
    receivers: 0,
    co2: 0,
  });

  const [trendData, setTrendData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [donorCategoryData, setDonorCategoryData] = useState([]);

  useEffect(() => {
    // ⛔ WAIT FOR AUTH
    if (!auth.currentUser) return;

    const loadDashboard = async () => {
      try {
        /* ---------- FOOD LISTINGS ---------- */
        const foodSnap = await getDocs(collection(db, "food_listings"));

        let totalWaste = 0;
        let redistributed = 0;
        let composted = 0;
        const monthly = {};

        foodSnap.forEach(doc => {
          const d = doc.data();
          const qty = d.quantityKg || 0;
          const date = d.pickupDate?.toDate?.() || null;

          totalWaste += qty;
          if (d.status === "collected") redistributed += qty;
          if (d.status === "composted") composted += qty;

          if (date) {
            const month = date.toLocaleString("en-US", { month: "short" });
            monthly[month] = (monthly[month] || 0) + qty;
          }
        });

        setTrendData(
          Object.keys(monthly).map(m => ({ name: m, value: monthly[m] }))
        );

        setDistributionData([
          {
            name: "Redistributed",
            value: totalWaste ? Math.round((redistributed / totalWaste) * 100) : 0,
            color: "#F97316",
          },
          {
            name: "Composted",
            value: totalWaste ? Math.round((composted / totalWaste) * 100) : 0,
            color: "#FDBA74",
          },
        ]);

        /* ---------- USERS ---------- */
        const usersSnap = await getDocs(collection(db, "users"));

        let donors = 0;
        let receivers = 0;
        const categories = { Hotel: 0, Restaurant: 0, Event: 0, Catering: 0 };

        usersSnap.forEach(doc => {
          const u = doc.data();
          if (u.role === "donor") {
            donors++;
            if (u.type) categories[u.type] = (categories[u.type] || 0) + 1;
          }
          if (u.role === "receiver") receivers++;
        });

        setDonorCategoryData(
          Object.keys(categories).map(k => ({
            name: k,
            value: categories[k],
          }))
        );

        /* ---------- FINAL STATS ---------- */
        setStats({
          totalWaste,
          redistributed,
          composted,
          donors,
          receivers,
          co2: Math.round(totalWaste * 0.0025),
        });

      } catch (err) {
        console.error("Dashboard Firestore error:", err.code, err.message);
      }
    };

    loadDashboard();
  }, [auth.currentUser]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Food Waste Collected" value={stats.totalWaste} unit="kg" icon={Trash2} color="text-orange-600" iconColor="bg-orange-100" />
        <StatCard title="Food Redistributed" value={stats.redistributed} unit="kg" icon={Recycle} color="text-green-600" iconColor="bg-green-100" />
        <StatCard title="Manure Produced" value={stats.composted} unit="kg" icon={Leaf} color="text-emerald-600" iconColor="bg-emerald-100" />
        <StatCard title="CO₂ Emissions Reduced" value={stats.co2} unit="tons" icon={Cloud} color="text-blue-600" iconColor="bg-blue-100" />
        <StatCard title="Active Donors" value={stats.donors} icon={Users} color="text-purple-600" iconColor="bg-purple-100" />
        <StatCard title="Active Receivers" value={stats.receivers} icon={UserCheck} color="text-indigo-600" iconColor="bg-indigo-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#F97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={distributionData} dataKey="value" innerRadius={60} outerRadius={80}>
                {distributionData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={donorCategoryData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#F97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
