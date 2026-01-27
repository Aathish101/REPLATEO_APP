export default function StatsCard({ title, value, trend }) {
  return (
    <div className="bg-white rounded-2xl p-6 border shadow-sm">
      <p className="text-sm text-gray-500 font-semibold">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className="text-sm text-green-600 mt-1">{trend}</p>
    </div>
  );
}
