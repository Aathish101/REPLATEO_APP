import React, { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Legend
} from "recharts";
import {
  Globe, BarChart3, TrendingUp, FileText, Download, UploadCloud
} from "lucide-react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Analytics = () => {
  const [wasteData, setWasteData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [stats, setStats] = useState({
    co2: 0,
    meals: 0,
    farmers: 0,
    communities: 0,
    totalWaste: 0,
    redistributed: 0,
    composted: 0,
  });

  /* =========================
     FOOD LISTINGS ANALYTICS
  ========================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "food_listings"), (snap) => {
      const monthly = {};
      const heatmap = {
        Hotel: {}, Restaurant: {}, Event: {}, Catering: {}
      };

      let totalWaste = 0;
      let redistributed = 0;
      let composted = 0;

      snap.forEach(doc => {
        const d = doc.data();
        const qty = d.quantityKg || 0;
        const month = d.pickupDate?.toDate()
          ?.toLocaleString("en-US", { month: "short" });

        totalWaste += qty;

        if (d.status === "collected") redistributed += qty;
        if (d.status === "composted") composted += qty;

        if (month) {
          monthly[month] = monthly[month] || { total: 0, redistributed: 0 };
          monthly[month].total += qty;
          if (d.status === "collected") monthly[month].redistributed += qty;
        }

        if (d.donorType && month) {
          heatmap[d.donorType][month] =
            (heatmap[d.donorType][month] || 0) + qty;
        }
      });

      setWasteData(
        Object.keys(monthly).map(m => ({
          name: m,
          total: monthly[m].total,
          redistributed: monthly[m].redistributed
        }))
      );

      setAreaData(
        Object.keys(heatmap).map(type => ({
          name: type,
          jan: heatmap[type].Jan || 0,
          feb: heatmap[type].Feb || 0,
          mar: heatmap[type].Mar || 0,
          apr: heatmap[type].Apr || 0,
          may: heatmap[type].May || 0,
          jun: heatmap[type].Jun || 0,
        }))
      );

      setStats(s => ({
        ...s,
        totalWaste,
        redistributed,
        composted,
        meals: Math.round(redistributed / 0.5), // ~500g/meal
        co2: Math.round(totalWaste * 0.0025),
      }));
    });

    return () => unsub();
  }, []);

  /* =========================
     ORDERS → REVENUE
  ========================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snap) => {
      const monthly = {};

      snap.forEach(doc => {
        const d = doc.data();
        const month = d.createdAt?.toDate()
          ?.toLocaleString("en-US", { month: "short" });

        if (!month) return;

        monthly[month] = monthly[month] || { composted: 0, revenue: 0 };
        monthly[month].composted += d.quantityKg || 0;

        if (d.paymentStatus === "Paid") {
          monthly[month].revenue += d.amount || 0;
        }
      });

      setRevenueData(
        Object.keys(monthly).map(m => ({
          name: m,
          composted: monthly[m].composted,
          revenue: monthly[m].revenue
        }))
      );
    });

    return () => unsub();
  }, []);

  /* =========================
     USERS → IMPACT
  ========================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snap) => {
      let farmers = 0;
      let ngos = 0;

      snap.forEach(doc => {
        const u = doc.data();
        if (u.role === "receiver" && u.type === "Farmer") farmers++;
        if (u.role === "receiver" && u.type === "NGO") ngos++;
      });

      setStats(s => ({
        ...s,
        farmers,
        communities: ngos,
      }));
    });

    return () => unsub();
  }, []);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-gray-500 text-sm">Real-time sustainability insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
          <UploadCloud size={18} /> Generate Report
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="CO₂ Reduced" value={`${stats.co2} tons`} icon={Globe} />
        <Stat label="Meals Redistributed" value={stats.meals} icon={BarChart3} />
        <Stat label="Farmers Benefited" value={stats.farmers} icon={TrendingUp} />
        <Stat label="Communities Served" value={stats.communities} icon={FileText} />
      </div>

      {/* AREA CHART */}
      <ChartBox title="Yearly Waste Management Trend">
        <AreaChart data={wasteData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area dataKey="total" stroke="#F97316" fill="#FDBA74" />
          <Area dataKey="redistributed" stroke="#22C55E" fill="#BBF7D0" />
        </AreaChart>
      </ChartBox>

      {/* LINE CHART */}
      <ChartBox title="Composting & Revenue">
        <LineChart data={revenueData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="composted" stroke="#F97316" />
          <Line dataKey="revenue" stroke="#22C55E" />
        </LineChart>
      </ChartBox>

      {/* HEATMAP */}
      <ChartBox title="Waste Generation Heatmap">
        <BarChart data={areaData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="jan" fill="#FDBA74" />
          <Bar dataKey="feb" fill="#FB923C" />
          <Bar dataKey="mar" fill="#F97316" />
          <Bar dataKey="apr" fill="#EA580C" />
          <Bar dataKey="may" fill="#C2410C" />
          <Bar dataKey="jun" fill="#9A3412" />
        </BarChart>
      </ChartBox>

      {/* SUMMARY */}
      <div className="bg-orange-50 p-6 rounded-xl text-center">
        <h3 className="text-orange-600 font-medium mb-4">Sustainability Impact (YTD)</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Impact label="Total Waste" value={`${stats.totalWaste} kg`} />
          <Impact label="Redistributed" value={`${stats.redistributed} kg`} />
          <Impact label="Manure Produced" value={`${stats.composted} kg`} />
        </div>
      </div>

    </div>
  );
};

/* SMALL COMPONENTS */
const Stat = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm flex justify-between">
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    <Icon className="text-orange-500" />
  </div>
);

const ChartBox = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl border shadow-sm">
    <h2 className="font-semibold mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={280}>
      {children}
    </ResponsiveContainer>
  </div>
);

const Impact = ({ label, value }) => (
  <div>
    <h2 className="text-3xl font-bold text-orange-500">{value}</h2>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default Analytics;
