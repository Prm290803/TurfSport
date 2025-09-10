import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useLoginForm from "../../hooks/useLoginForm";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements for 3D effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 relative z-10 transform transition-all duration-300 hover:shadow-3xl">
        {/* 3D top edge effect */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        
        <div className="p-8">
          {/* Header with 3D text effect */}
          <div className="text-center mb-8 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
            <h1 className="text-3xl font-bold text-white relative z-10 drop-shadow-md">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1 transform transition-all duration-200 hover:translate-y-0.5">
              <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full py-3 px-4 bg-gray-700/70 text-white rounded-xl border-2 border-gray-600/50 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all duration-200 shadow-inner ${
                    errors.email ? 'border-red-500/60 focus:ring-red-500/30' : ''
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-1 transform transition-all duration-200 hover:translate-y-0.5">
              <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full py-3 px-4 bg-gray-700/70 text-white rounded-xl border-2 border-gray-600/50 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 focus:outline-none transition-all duration-200 shadow-inner ${
                    errors.password ? 'border-red-500/60 focus:ring-red-500/30' : ''
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex justify-between items-center transform transition-all duration-200 hover:translate-y-0.5">
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            
            <div className="pt-4 transform transition-transform duration-200 hover:translate-y-0.5">
              <Button 
                type="submit" 
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 border border-blue-500/30"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-6 pt-4 border-t border-gray-700/50">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;