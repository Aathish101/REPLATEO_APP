import React, { useState } from 'react';
import { 
  Bell, Shield, Target, Globe, Mail, DollarSign, Save, RotateCcw 
} from 'lucide-react';

const Settings = () => {
  // Mock State for toggles (visual only)
  const [toggles, setToggles] = useState({
    email: true,
    pickup: true,
    payment: true,
    weekly: true,
    registration: false,
    maintenance: false,
  });

  const handleToggle = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  const ToggleSwitch = ({ isOn, onToggle }) => (
    <div 
      onClick={onToggle}
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-orange-500' : 'bg-gray-300'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <div className="space-y-6 pb-20"> {/* pb-20 for scrolling space */}
      
      {/* --- Header --- */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure your application preferences</p>
      </div>

      {/* --- Section 1: Notifications & Roles --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Bell size={20} className="text-orange-500" />
            Notification Preferences
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Email Notifications</span>
              <ToggleSwitch isOn={toggles.email} onToggle={() => handleToggle('email')} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Pickup Request Alerts</span>
              <ToggleSwitch isOn={toggles.pickup} onToggle={() => handleToggle('pickup')} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Payment Notifications</span>
              <ToggleSwitch isOn={toggles.payment} onToggle={() => handleToggle('payment')} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Weekly Summary Reports</span>
              <ToggleSwitch isOn={toggles.weekly} onToggle={() => handleToggle('weekly')} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">New User Registration Alerts</span>
              <ToggleSwitch isOn={toggles.registration} onToggle={() => handleToggle('registration')} />
            </div>
          </div>
        </div>

        {/* Role Permissions */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Shield size={20} className="text-orange-500" />
            Role Permissions
          </h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800">Admin</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">Full access to all features</p>
              <button className="text-orange-500 border border-orange-500 px-3 py-1 rounded text-xs font-medium hover:bg-orange-50 transition-colors">View Details</button>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800">Donor</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">Can create pickup requests and view history</p>
              <button className="text-orange-500 border border-orange-500 px-3 py-1 rounded text-xs font-medium hover:bg-orange-50 transition-colors">View Details</button>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800">Receiver</h4>
              </div>
              <p className="text-xs text-gray-500 mb-3">Can receive food and order manure</p>
              <button className="text-orange-500 border border-orange-500 px-3 py-1 rounded text-xs font-medium hover:bg-orange-50 transition-colors">View Details</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 2: Sustainability Goals --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Target size={20} className="text-orange-500" />
          Sustainability Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Collection Target (kg)</label>
            <input type="text" defaultValue="15000" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CO₂ Reduction Goal (tons)</label>
            <input type="text" defaultValue="40" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Donors Target</label>
            <input type="text" defaultValue="10" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          Update Goals
        </button>
      </div>

      {/* --- Section 3: General & Email Settings --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Globe size={20} className="text-orange-500" />
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
              <input type="text" defaultValue="Replateo" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <input type="text" defaultValue="UTC-5 (Eastern Time)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <input type="text" defaultValue="USD ($)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-medium text-gray-700">Maintenance Mode</span>
              <ToggleSwitch isOn={toggles.maintenance} onToggle={() => handleToggle('maintenance')} />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Mail size={20} className="text-orange-500" />
            Email Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <input type="text" defaultValue="support@replateo.com" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
              <input type="text" defaultValue="admin@replateo.com" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notifications Email</label>
              <input type="text" defaultValue="notifications@replateo.com" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="pt-2">
              <button className="w-full bg-orange-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Test Email Configuration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 4: Manure Pricing --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <DollarSign size={20} className="text-orange-500" />
          Manure Pricing Configuration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Base Price per kg</label>
            <input type="text" defaultValue="0.50" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <p className="text-xs text-gray-400 mt-1">Current price: $0.50/kg</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Quantity (kg)</label>
            <input type="text" defaultValue="50" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <p className="text-xs text-gray-400 mt-1">Bulk orders only</p>
          </div>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          Update Pricing
        </button>
      </div>

      {/* --- Footer Actions --- */}
      <div className="flex justify-end gap-4 pt-4 pb-8">
        <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          <RotateCcw size={18} />
          Reset to Defaults
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
          <Save size={18} />
          Save All Changes
        </button>
      </div>

    </div>
  );
};

export default Settings;