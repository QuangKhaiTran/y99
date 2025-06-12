"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, RefreshCw, LogIn, User, Lock } from "lucide-react"

interface LoginFormProps {
  onLogin: (
    username: string,
    password: string,
    captchaInput: string,
    captchaCode: string,
    trustDevice: boolean,
  ) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
  isLockedOut: boolean
}

export default function LoginForm({ onLogin, isLoading, isLockedOut }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [captchaInput, setCaptchaInput] = useState("")
  const [captchaCode, setCaptchaCode] = useState("")
  const [trustDevice, setTrustDevice] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: "", color: "" })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789"
    let code = ""
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(code)
    setCaptchaInput("")
  }

  const checkPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    let strength = { score: 0, text: "", color: "" }

    if (score < 3) {
      strength = { score: 33, text: "Yếu", color: "text-red-500" }
    } else if (score < 5) {
      strength = { score: 66, text: "Trung bình", color: "text-yellow-500" }
    } else {
      strength = { score: 100, text: "Mạnh", color: "text-green-500" }
    }

    setPasswordStrength(strength)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = await onLogin(username, password, captchaInput, captchaCode, trustDevice)

    if (!result.success) {
      if (result.error?.includes("CAPTCHA")) {
        setErrors({ captcha: result.error })
        generateCaptcha()
      } else if (result.error) {
        setErrors({ general: result.error })
        generateCaptcha()
      }
    }
  }

  return (
    <>
      {/* Logo and Header */}
      <div className="text-center slide-in-left">
        <div className="flex justify-center mb-8">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <div className="relative h-24 w-24 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center floating-animation shadow-2xl border-2 border-primary-200 dark:border-primary-700">
              <div className="h-16 w-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Y99</span>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 fade-in">Xin Chào!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 fade-in">Đăng nhập vào hệ thống quản lý khoản vay Y99</p>
      </div>

      {/* Login Form */}
      <div className="enhanced-card rounded-3xl shadow-2xl p-10 space-y-8 scale-in">
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="space-y-3">
            <label
              htmlFor="username"
              className="block text-sm font-bold text-gray-700 dark:text-gray-200 tracking-wide"
            >
              Tên đăng nhập
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-focus block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-0 focus:border-primary bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 font-medium"
                placeholder="Nhập tên đăng nhập"
              />
            </div>
            {errors.username && (
              <div className="text-red-600 dark:text-red-400 text-sm font-medium">{errors.username}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-3">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 dark:text-gray-200 tracking-wide"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-6 w-6 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  checkPasswordStrength(e.target.value)
                }}
                className="input-focus block w-full pl-12 pr-14 py-4 text-base border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-0 focus:border-primary bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 font-medium"
                placeholder="Nhập mật khẩu"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {/* Password Strength Indicator */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    passwordStrength.score < 50
                      ? "bg-red-500"
                      : passwordStrength.score < 80
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${passwordStrength.color}`}>{passwordStrength.text}</span>
            </div>
          </div>

          {/* CAPTCHA */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 tracking-wide">
              Xác thực capcha
            </label>
            <div className="flex items-center space-x-4">
              <div className="captcha-container bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 select-none border-2 border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-wider">
                    {captchaCode}
                  </span>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-primary hover:text-primary-700 transition-colors p-1 rounded-lg hover:bg-white/50 dark:hover:bg-gray-500/50"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <input
                id="captcha-input"
                type="text"
                required
                maxLength={5}
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                className="input-focus w-32 px-4 py-3 text-center text-lg font-bold border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-0 focus:border-primary bg-white/90 dark:bg-gray-700/90 text-gray-900 dark:text-white"
                placeholder="Mã"
                autoComplete="off"
              />
            </div>
            {errors.captcha && (
              <div className="text-red-600 dark:text-red-400 text-sm font-medium">{errors.captcha}</div>
            )}
          </div>

          {/* Device Trust */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="trust-device"
                name="trust-device"
                type="checkbox"
                checked={trustDevice}
                onChange={(e) => setTrustDevice(e.target.checked)}
                className="h-5 w-5 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
              />
              <label
                htmlFor="trust-device"
                className="ml-3 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <span>Tin cậy thiết bị này trong 30 ngày</span>
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="text-primary hover:text-primary-700 font-semibold transition-colors duration-200 hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="text-red-600 dark:text-red-400 text-sm font-medium text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              {errors.general}
            </div>
          )}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading || isLockedOut}
              className="btn-hover group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-xl text-white gradient-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <LogIn className="h-6 w-6 text-white group-hover:text-white/80 transition-colors duration-200" />
              </span>
              <span>{isLoading ? "Đang xử lý..." : "Đăng nhập"}</span>
              {isLoading && (
                <div className="ml-3">
                  <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
