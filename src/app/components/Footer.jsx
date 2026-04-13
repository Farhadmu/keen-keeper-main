import { FaYoutube, FaFacebook, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#1a3d2e] text-white mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-bold mb-3">
          Keen<span className="font-light">Keeper</span>
        </h2>
        <p className="text-gray-300 text-sm mb-6 max-w-md mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <p className="text-gray-300 text-sm mb-4 font-medium">Social Links</p>
        <div className="flex items-center justify-center gap-4 mb-10">
          <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-full transition-colors">
            <FaYoutube size={18} />
          </a>
          <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-full transition-colors">
            <FaFacebook size={18} />
          </a>
          <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-full transition-colors">
            <FaXTwitter size={18} />
          </a>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;