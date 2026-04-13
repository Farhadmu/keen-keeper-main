'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Phone, MessageSquare, Video, Archive, Trash2, Clock, Edit } from 'lucide-react';

const statusConfig = {
  'overdue': 'bg-red-100 text-red-700',
  'almost due': 'bg-yellow-100 text-yellow-700',
  'on-track': 'bg-green-100 text-green-700',
};

export default function FriendDetails() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
  const fetchFriend = async () => {
    const res = await fetch('/friends.json');
    const data = await res.json();
    const found = data.find(f => f.id === parseInt(id));
    setFriend(found);
  };
  fetchFriend();
  const saved = sessionStorage.getItem('timeline');
  if (saved) setTimeline(JSON.parse(saved));
}, [id]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCheckIn = (type) => {
  const newEntry = {
    id: Date.now(),
    friendId: parseInt(id),
    friendName: friend.name,
    type,
    title: `${type} with ${friend.name}`,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }),
  };
  const saved = sessionStorage.getItem('timeline');
  const existing = saved ? JSON.parse(saved) : [];
  const updated = [newEntry, ...existing];
  sessionStorage.setItem('timeline', JSON.stringify(updated));
  setTimeline(updated);
  showToast(`✅ ${type} with ${friend.name} logged!`);
};

  const recentInteractions = timeline
    .filter(t => t.friendId === parseInt(id))
    .slice(0, 4);

  if (!friend) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-[#1a3d2e] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {toast && (
        <div className="fixed top-20 right-6 bg-[#1a3d2e] text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
            />
            <h2 className="text-lg font-bold text-gray-900 mb-1">{friend.name}</h2>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[friend.status]}`}>
              {friend.status.charAt(0).toUpperCase() + friend.status.slice(1)}
            </span>
            <div className="flex flex-wrap gap-1 justify-center mt-2 mb-3">
              {friend.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 italic mb-2">"{friend.bio}"</p>
            <p className="text-xs text-gray-400">Preferred: {friend.email}</p>
          </div>

          <button className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full">
            <Clock size={16} className="text-gray-500" /> Snooze 2 Weeks
          </button>
          <button className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full">
            <Archive size={16} className="text-gray-500" /> Archive
          </button>
          <button className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full">
            <Trash2 size={16} /> Delete
          </button>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 flex flex-col gap-4">

          <div className="grid grid-cols-3 gap-4">
            {[
              { value: friend.days_since_contact, label: 'Days Since Contact' },
              { value: friend.goal, label: 'Goal (Days)' },
              {
                value: new Date(friend.next_due_date).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                }),
                label: 'Next Due'
              },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900">Relationship Goal</h3>
              <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 flex items-center gap-1">
                <Edit size={12} /> Edit
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Connect every <span className="font-bold">{friend.goal} days</span>
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'Call', icon: <Phone size={22} /> },
                { type: 'Text', icon: <MessageSquare size={22} /> },
                { type: 'Video', icon: <Video size={22} /> },
              ].map(({ type, icon }) => (
                <button
                  key={type}
                  onClick={() => handleCheckIn(type)}
                  className="flex flex-col items-center gap-2 border border-gray-200 rounded-xl py-4 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  {icon}
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Recent Interactions</h3>
              <a href="/timeline" className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700">
                <Clock size={12} /> Full History
              </a>
            </div>
            {recentInteractions.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                No interactions yet. Use Quick Check-In above!
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {recentInteractions.map(entry => (
                  <div key={entry.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{entry.type}</p>
                      <p className="text-xs text-gray-400">{entry.title}</p>
                    </div>
                    <p className="text-xs text-gray-400">{entry.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}s
// Friends data added
// Friend details page