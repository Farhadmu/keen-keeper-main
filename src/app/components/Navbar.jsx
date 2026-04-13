'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: <Home size={16} /> },
    { href: '/timeline', label: 'Timeline', icon: <Clock size={16} /> },
    { href: '/stats', label: 'Stats', icon: <BarChart2 size={16} /> },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-gray-900">
        KeenKeeper
      </Link>

      <div className="flex items-center gap-2">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive(href)
                ? 'bg-[#1a3d2e] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;