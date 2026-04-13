'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Users, CheckCircle, AlertCircle, Activity } from 'lucide-react';

const statusConfig = {
  'overdue': { label: 'Overdue', className: 'bg-red-100 text-red-700' },
  'almost due': { label: 'Almost Due', className: 'bg-yellow-100 text-yellow-700' },
  'on-track': { label: 'On-Track', className: 'bg-green-100 text-green-700' },
};

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFriends = async () => {
      await new Promise(r => setTimeout(r, 1000));
      const res = await fetch('/friends.json');
      const data = await res.json();
      setFriends(data);
      setLoading(false);
    };
    fetchFriends();
  }, []);

  const stats = {
    total: friends.length,
    onTrack: friends.filter(f => f.status === 'on-track').length,
    needAttention: friends.filter(f => f.status === 'overdue' || f.status === 'almost due').length,
    interactions: 12,
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Banner */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 mb-6">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button
          onClick={() => alert('Add Friend feature coming soon!')}
          className="bg-[#1a3d2e] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 mx-auto hover:bg-[#152f23] transition-colors"
        >
          <Plus size={18} />
          Add a Friend
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { icon: <Users size={20} className="text-gray-400" />, value: stats.total, label: 'Total Friends' },
          { icon: <CheckCircle size={20} className="text-green-500" />, value: stats.onTrack, label: 'On Track' },
          { icon: <AlertCircle size={20} className="text-red-500" />, value: stats.needAttention, label: 'Need Attention' },
          { icon: <Activity size={20} className="text-blue-500" />, value: stats.interactions, label: 'Interactions This Month' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Friends Grid */}
      <h2 className="text-xl font-semibold text-gray-900 mb-5">Your Friends</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] gap-4">
          <div className="w-12 h-12 border-4 border-[#1a3d2e] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your friends...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {friends.map(friend => (
            <div
              key={friend.id}
              onClick={() => router.push(`/friends/${friend.id}`)}
              className="bg-white border border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:shadow-md transition-shadow"
            >
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
              />
              <p className="font-semibold text-gray-900 text-sm">{friend.name}</p>
              <p className="text-xs text-gray-400 mb-2">{friend.days_since_contact}d ago</p>
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {friend.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[friend.status]?.className}`}>
                {statusConfig[friend.status]?.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}