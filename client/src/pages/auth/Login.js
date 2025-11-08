import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Eye, EyeOff } from 'lucide-react';

const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('username', { 
        type: 'manual', 
        message: result.error || 'Login failed' 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3 mb-6">
            <MessageSquare className="w-12 h-12 sm:w-14 sm:h-14 text-primary-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">TechForum</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-600">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
              >
                create a new account
              </Link>
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="form-label">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className={`form-input ${errors.username ? 'border-red-300 focus:border-red-500' : ''}`}
                placeholder="Enter your username or email"
                {...register('username')}
              />
              {errors.username && (
                <p className="form-error mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`form-input pr-10 ${errors.password ? 'border-red-300 focus:border-red-500' : ''}`}
                  placeholder="Enter your password"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="form-error mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center pt-2">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loading-spinner w-4 h-4"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center pt-4">
            <button
              type="button"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
              onClick={() => alert('Forgot password functionality would be implemented here')}
            >
              Forgot your password?
            </button>
          </div>
        </form>

        {/* Demo Accounts */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
          <h3 className="text-sm font-medium text-blue-900">Demo Accounts</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-800">
              <div className="bg-white px-2 py-1 rounded border border-blue-100">
                <strong>Admin:</strong> admin / admin123
              </div>
              <div className="bg-white px-2 py-1 rounded border border-blue-100">
                <strong>Developer:</strong> developer / dev123
              </div>
            </div>
            <div className="bg-white px-2 py-1 rounded border border-blue-100 text-xs text-blue-800">
              <strong>Test User:</strong> testuser / password123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;