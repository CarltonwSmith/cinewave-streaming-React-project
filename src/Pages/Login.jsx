import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication - will be replaced with actual API
    setTimeout(() => {
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.name || 'User'
      }));
      
      toast({
        title: isSignUp ? "Account created successfully!" : "Welcome back!",
        description: "Redirecting to home..."
      });
      
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574267432644-f610a4ab46c3?w=1920"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 md:px-12 py-6">
        <Link to="/" className="text-[#E50914] font-bold text-3xl md:text-4xl">
          NETFLIX
        </Link>
      </div>

      {/* Form */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <div className="bg-black/75 rounded px-12 py-16 max-w-md w-full">
          <h1 className="text-white text-3xl font-semibold mb-8">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required={isSignUp}
                  className="w-full px-4 py-3 rounded bg-[#333] text-white border border-gray-600 focus:border-white focus:outline-none"
                />
              </div>
            )}
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-[#333] text-white border border-gray-600 focus:border-white focus:outline-none"
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded bg-[#333] text-white border border-gray-600 focus:border-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E50914] text-white py-3 rounded font-semibold hover:bg-[#c11119] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          <div className="mt-8">
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Already have an account?' : 'New to Netflix?'}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-white hover:underline"
              >
                {isSignUp ? 'Sign in now' : 'Sign up now'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;