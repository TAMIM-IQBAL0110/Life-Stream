import { useState } from 'react';
import { Link } from 'react-router-dom';

const  SignIn = ()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="bg-[#f8f6f6]">

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px] bg-white p-8 rounded-2xl shadow-md">
          {/* Welcome Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🩸</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 text-center">Welcome Back</h1>
            <p className="text-slate-500 text-sm mt-2 text-center">Sign in to your donor account</p>
          </div>

          {/* Sign In Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-slate-700 text-sm font-semibold">Password</label>
                <a href="#" className="text-red-600 text-xs font-bold hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition mt-6"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? 
              <Link to="/donate" className="text-red-600 font-bold hover:underline ml-1">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignIn;