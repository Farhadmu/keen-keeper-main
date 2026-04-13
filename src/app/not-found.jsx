import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-8xl font-bold text-[#1a3d2e] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="bg-[#1a3d2e] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#152f23] transition-colors"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
}