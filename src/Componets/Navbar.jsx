import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setShowSearch(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-[#E50914] font-bold text-2xl md:text-3xl">
            NETFLIX
          </Link>
          {isAuthenticated && (
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-gray-300 transition text-sm font-medium">
                Home
              </Link>
              <Link to="/tv-shows" className="text-white hover:text-gray-300 transition text-sm font-medium">
                TV Shows
              </Link>
              <Link to="/movies" className="text-white hover:text-gray-300 transition text-sm font-medium">
                Movies
              </Link>
              <Link to="/my-list" className="text-white hover:text-gray-300 transition text-sm font-medium">
                My List
              </Link>
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            {showSearch ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  className="bg-black/70 border border-white text-white px-4 py-1 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-white"
                  autoFocus
                  onBlur={() => !searchQuery && setShowSearch(false)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-gray-300 transition"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <Bell className="w-5 h-5 text-white cursor-pointer hover:text-gray-300 transition" />
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
                <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute right-0 top-12 bg-black/90 border border-gray-600 py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-800 text-sm">
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 text-sm"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-[#E50914] text-white px-6 py-2 rounded hover:bg-[#c11119] transition font-medium"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;