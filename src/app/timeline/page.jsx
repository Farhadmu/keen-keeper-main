'use client';
import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Video } from 'lucide-react';

const typeConfig = {
  'Call': { icon: <Phone size={18} className="text-gray-600" /> },
  'Text': { icon: <MessageSquare size={18} className="text-gray-600" /> },
  'Video': { icon: <Video size={18} className="text-gray-600" /> },
};

export default function TimelinePage() {
  const [filter, setFilter] = useState('All');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('timeline');
    const userEntries = saved ? JSON.parse(saved) : [];
    setEntries(userEntries);
  }, []);

  const filters = ['All', 'Call', 'Text', 'Video'];

  const filtered = filter === 'All'
    ? entries
    : entries.filter(e => e.type === filter);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Timeline</h1>

      <div className="mb-6">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]"
        >
          {filters.map(f => (
            <option key={f} value={f}>
              {f === 'All' ? 'Filter timeline' : f}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No interactions yet.</p>
            <p className="text-gray-400 text-sm mt-1">Go to a friend's page and use Quick Check-In!</p>
          </div>
        ) : (
          filtered.map(entry => (
            <div
              key={entry.id}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4"
            >
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                {typeConfig[entry.type]?.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{entry.type}</span>
                  {' '}with {entry.friendName}
                </p>
                <p className="text-xs text-gray-400">{entry.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
// Timeline feature