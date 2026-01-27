import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, BarChart, Bar, Legend
} from 'recharts';
import { 
  Globe, BarChart3, TrendingUp, FileText, Download, UploadCloud 
} from 'lucide-react';

const Analytics = () => {
  // --- Mock Data ---
  
  // Area Chart Data
  const wasteData = [
    { name: 'Jan', total: 2800, redistributed: 1800 },
    { name: 'Feb', total: 3000, redistributed: 1950 },
    { name: 'Mar', total: 3200, redistributed: 2100 },
    { name: 'Apr', total: 2950, redistributed: 1900 },
    { name: 'May', total: 3500, redistributed: 2300 },
    { name: 'Jun', total: 3800, redistributed: 2450 },
  ];

  // Line Chart Data
  const revenueData = [
    { name: 'Jan', composted: 1000, revenue: 500 },
    { name: 'Feb', composted: 1100, revenue: 550 },
    { name: 'Mar', composted: 1250, revenue: 620 },
    { name: 'Apr', composted: 1150, revenue: 580 },
    { name: 'May', composted: 1350, revenue: 680 },
    { name: 'Jun', composted: 1450, revenue: 720 },
  ];

  // Grouped Bar Chart Data (Heatmap)
  const areaData = [
    { name: 'Downtown Hotels', jan: 450, feb: 480, mar: 510, apr: 490, may: 540, jun: 560 },
    { name: 'Restaurant District', jan: 650, feb: 700, mar: 750, apr: 720, may: 800, jun: 850 },
    { name: 'Event Centers', jan: 300, feb: 350, mar: 400, apr: 380, may: 420, jun: 450 },
    { name: 'Catering Services', jan: 280, feb: 310, mar: 340, apr: 320, may: 360, jun: 390 },
  ];

  const reports = [
    { title: 'June 2026 Sustainability Report', date: '2026-06-30 • 2.4 MB' },
    { title: 'May 2026 Sustainability Report', date: '2026-05-31 • 2.2 MB' },
    { title: 'Q2 2026 Impact Summary', date: '2026-06-30 • 3.1 MB' },
    { title: 'April 2026 Sustainability Report', date: '2026-04-30 • 2.3 MB' },
  ];

  return (
    <div className="space-y-6">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Comprehensive sustainability insights and impact reports</p>
        </div>
        <div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm">
            <UploadCloud size={18} />
            Generate Report
          </button>
        </div>
      </div>

      {/* --- Top Stats Row (4 Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-gray-500 text-sm font-medium">CO₂ Emissions Reduced</p><h3 className="text-2xl font-bold text-green-600 mt-1">195 tons</h3></div>
          <div className="p-3 bg-white rounded-full border border-gray-100"><Globe size={24} className="text-green-600" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-gray-500 text-sm font-medium">Meals Redistributed</p><h3 className="text-2xl font-bold text-blue-600 mt-1">41,240</h3></div>
          <div className="p-3 bg-white rounded-full border border-gray-100"><BarChart3 size={24} className="text-blue-600" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-gray-500 text-sm font-medium">Farmers Benefited</p><h3 className="text-2xl font-bold text-orange-600 mt-1">38</h3></div>
          <div className="p-3 bg-white rounded-full border border-gray-100"><TrendingUp size={24} className="text-orange-600" /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div><p className="text-gray-500 text-sm font-medium">Communities Served</p><h3 className="text-2xl font-bold text-purple-600 mt-1">15</h3></div>
          <div className="p-3 bg-white rounded-full border border-gray-100"><FileText size={24} className="text-purple-600" /></div>
        </div>
      </div>

      {/* --- Yearly Waste Trend (Area Chart) --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Yearly Waste Management Trend</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={wasteData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRedis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="plainline" />
              <Area type="monotone" dataKey="total" name="Total Waste (kg)" stroke="#F97316" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
              <Area type="monotone" dataKey="redistributed" name="Redistributed (kg)" stroke="#22C55E" fillOpacity={1} fill="url(#colorRedis)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Middle Section: Line Chart & Reports --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Composting & Revenue Analysis */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Composting & Revenue Analysis</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} />
                <Line type="monotone" dataKey="composted" name="Composted (kg)" stroke="#F97316" strokeWidth={3} dot={{r: 4, fill:'#F97316', strokeWidth:2, stroke:'#fff'}} />
                <Line type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#22C55E" strokeWidth={3} dot={{r: 4, fill:'#22C55E', strokeWidth:2, stroke:'#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Download Reports */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Download Reports</h2>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{report.title}</h4>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors border border-gray-200 rounded-lg bg-white hover:border-orange-500">
                  <Download size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Heatmap (Grouped Bar Chart) --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Waste Generation Heatmap by Area</h2>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={areaData}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} dy={10} />
               <YAxis axisLine={false} tickLine={false} />
               <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
               <Legend verticalAlign="bottom" height={36} iconType="rect" iconSize={10} />
               <Bar dataKey="jan" name="Jan" fill="#FDBA74" radius={[2, 2, 0, 0]} />
               <Bar dataKey="feb" name="Feb" fill="#FB923C" radius={[2, 2, 0, 0]} />
               <Bar dataKey="mar" name="Mar" fill="#F97316" radius={[2, 2, 0, 0]} />
               <Bar dataKey="apr" name="Apr" fill="#EA580C" radius={[2, 2, 0, 0]} />
               <Bar dataKey="may" name="May" fill="#C2410C" radius={[2, 2, 0, 0]} />
               <Bar dataKey="jun" name="Jun" fill="#9A3412" radius={[2, 2, 0, 0]} />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* --- Sustainability Impact Summary (Bottom Banner) --- */}
      <div className="bg-white p-8 rounded-xl border border-orange-100 shadow-sm">
        <h3 className="text-orange-500 font-medium mb-6">Sustainability Impact Summary (YTD)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-3xl font-bold text-orange-500">20,190 kg</h2>
            <p className="text-sm text-gray-500 mt-1">Total Food Waste Collected</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-600">12,950 kg</h2>
            <p className="text-sm text-gray-500 mt-1">Food Redistributed</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-blue-600">7,240 kg</h2>
            <p className="text-sm text-gray-500 mt-1">Manure Produced</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Analytics;