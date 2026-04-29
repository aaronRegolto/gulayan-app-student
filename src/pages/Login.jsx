import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../api'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    try {
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password
      })

      const token = response?.data?.token
      if (!token) {
        throw new Error(response?.data?.message || 'Invalid login response')
      }

      localStorage.setItem('token', token)
      toast.success('Signed in successfully')
      navigate('/dashboard')
    } catch (error) {
      let message = error?.response?.data?.message || error?.message || 'Login failed'
    
      if (message.toLowerCase().includes('invalid') || message.toLowerCase().includes('credentials')) {
        message = 'Hmm, that email or password doesn\'t look right. Please try again.'
      } else if (message.toLowerCase().includes('not found') || message.toLowerCase().includes('does not exist')) {
        message = 'We couldn\'t find an account with that email. Would you like to sign up?'
      } else if (message.toLowerCase().includes('network') || message.toLowerCase().includes('timeout')) {
        message = 'Connection issue. Please check your internet and try again.'
      }
      
      toast.error(message)
      console.error('Login failed:', error)
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 
          rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M3 21l5-5m0 0l5 5m-5-5V3m7 0l5 5m-5-5v18" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Gulayan</h1>
          <p className="text-green-600 font-medium">Welcome back to your garden! 🌿</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Garden email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoggingIn}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                                focus:ring-green-500 focus:border-transparent transition duration-200 
                                outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Garden password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoggingIn}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                                 focus:ring-green-500 focus:border-transparent transition duration-200 
                                 outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoggingIn}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:cursor-not-allowed"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Remember me on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 shadow-md ${
                isLoggingIn
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isLoggingIn && (
                <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
              )}
              {isLoggingIn ? 'Opening your garden...' : 'Open my garden'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            First time planting?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              disabled={isLoggingIn}
              className={`font-semibold transition ${
                isLoggingIn
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-green-600 hover:text-green-700 cursor-pointer'
              }`}
            >
              Start your garden
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you accept our{' '}
          <a href="#" className="text-green-600 hover:underline">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-green-600 hover:underline">Privacy
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
