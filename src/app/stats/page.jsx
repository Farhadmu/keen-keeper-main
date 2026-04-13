'use client';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#7C3AED', '#22c55e', '#1a3d2e'];

export default function StatsPage() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('timeline');
    const userEntries = saved ? JSON.parse(saved) : [];

    const counts = userEntries.reduce((acc, entry) => {
      if (['Call', 'Text', 'Video'].includes(entry.type)) {
        acc[entry.type] = (acc[entry.type] || 0) + 1;
      }
      return acc;
    }, {});

    const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
    setChartData(data);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Friendship Analytics</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-medium text-gray-500 mb-6">By Interaction Type</h2>

        {chartData.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No interactions logged yet.</p>
            <p className="text-gray-400 text-sm mt-1">
              Go to a friend's page and use Quick Check-In!
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} interactions`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
// Stats page