"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { SessionData } from "@/types/auth"
import { LogOut, User, Shield, Clock, Mail, UserCheck } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("y99_logged_in")
    const sessionData = localStorage.getItem("y99_session")

    if (!isLoggedIn || !sessionData) {
      router.push("/")
      return
    }

    try {
      const parsedSession = JSON.parse(sessionData)
      setSession(parsedSession)
    } catch (error) {
      console.error("Error parsing session data:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("y99_logged_in")
    localStorage.removeItem("y99_session")
    router.push("/")
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
      case "manager":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20"
      case "employee":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20"
    }
  }

  const getRoleName = (role: string) => {
    const roleNames = {
      admin: "Quản trị viên",
      manager: "Trưởng phòng",
      employee: "Nhân viên",
      viewer: "Người xem",
    }
    return roleNames[role as keyof typeof roleNames] || role
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">Y99</span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hệ thống quản lý Y99</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Chào mừng trở lại, {session.fullName}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
              {session.role === "admin" ? (
                <Shield className="h-10 w-10 text-red-600 dark:text-red-400" />
              ) : (
                <User className="h-10 w-10 text-primary-600 dark:text-primary-400" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Chào mừng đến với Dashboard Y99</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Bạn đã đăng nhập thành công với vai trò{" "}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(session.role)}`}>
                {getRoleName(session.role)}
              </span>
            </p>
          </div>
        </div>

        {/* User Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thông tin cá nhân</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Tên đăng nhập:</span>
                <p className="font-medium text-gray-900 dark:text-white">{session.username}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Họ tên:</span>
                <p className="font-medium text-gray-900 dark:text-white">{session.fullName}</p>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Liên hệ</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Email:</span>
                <p className="font-medium text-gray-900 dark:text-white">{session.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">ID người dùng:</span>
                <p className="font-medium text-gray-900 dark:text-white">#{session.userId}</p>
              </div>
            </div>
          </div>

          {/* Session Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Phiên làm việc</h3>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Thời gian đăng nhập:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(session.loginTime).toLocaleString("vi-VN")}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Trạng thái:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                  Đang hoạt động
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <UserCheck className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quyền hạn của bạn</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {session.permissions.map((permission, index) => {
              const permissionNames = {
                VIEW_LOANS: "Xem danh sách khoản vay",
                ADD_LOAN: "Thêm khoản vay mới",
                EDIT_LOAN: "Chỉnh sửa khoản vay",
                DELETE_LOAN: "Xóa khoản vay",
                VIEW_ANALYSIS: "Xem phân tích báo cáo",
                MANAGE_USERS: "Quản lý người dùng",
                EXPORT_DATA: "Xuất dữ liệu",
                PRINT_DATA: "In dữ liệu",
              }

              return (
                <div
                  key={index}
                  className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {permissionNames[permission as keyof typeof permissionNames] || permission}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Thông tin demo</h4>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                Đây là phiên bản demo của hệ thống Y99. Các tài khoản demo có sẵn:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-semibold text-red-600 dark:text-red-400">Admin</p>
                  <p className="text-gray-600 dark:text-gray-300">admin / admin123</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-semibold text-blue-600 dark:text-blue-400">Manager</p>
                  <p className="text-gray-600 dark:text-gray-300">manager / manager123</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-semibold text-green-600 dark:text-green-400">Employee</p>
                  <p className="text-gray-600 dark:text-gray-300">employee / employee123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
