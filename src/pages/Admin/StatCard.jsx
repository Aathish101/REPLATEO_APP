import React from 'react';
import { HelpCircle } from 'lucide-react'; // Fallback icon

const StatCard = ({ title, value, unit, change, icon: Icon, color, iconColor }) => {
  // Safety Check: If the icon is missing (undefined), use HelpCircle instead
  const ValidIcon = Icon || HelpCircle;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">
          {value} <span className="text-base font-normal text-gray-500">{unit}</span>
        </h3>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
          </span>
          <span className="text-xs text-gray-400 ml-2">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${iconColor || 'bg-orange-50'}`}>
        {/* The safety check happens here */}
        <ValidIcon className={`w-6 h-6 ${color || 'text-orange-500'}`} />
      </div>
    </div>
  );
};

export default StatCard;