import type { User } from "@/types/auth"
import { ROLE_PERMISSIONS } from "@/lib/auth"
import { Shield, UserIcon } from "lucide-react"

interface RoleDisplayModalProps {
  isOpen: boolean
  user: User | null
  onClose: () => void
}

export default function RoleDisplayModal({ isOpen, user, onClose }: RoleDisplayModalProps) {
  if (!isOpen || !user) return null

  const roleNames = {
    admin: "Quản trị viên",
    manager: "Trưởng phòng",
    employee: "Nhân viên",
    viewer: "Người xem",
  }

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

  const userPermissions = ROLE_PERMISSIONS[user.role] || []

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="enhanced-card rounded-3xl p-10 max-w-md w-full shadow-2xl scale-in">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-6">
            {user.role === "admin" ? (
              <Shield className="h-10 w-10 text-red-600 dark:text-red-400" />
            ) : (
              <UserIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Đăng nhập thành công!</h3>
          <div className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            <div className="font-semibold text-gray-900 dark:text-white">{user.fullName}</div>
            <div
              className={`text-sm ${user.role === "admin" ? "text-red-600 dark:text-red-400 font-bold" : "text-primary-600 dark:text-primary-400"}`}
            >
              {roleNames[user.role as keyof typeof roleNames]}
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-6">
            {userPermissions.map((permission) => (
              <div key={permission} className="flex items-center">
                <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {permissionNames[permission as keyof typeof permissionNames]}
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Đang chuyển hướng đến hệ thống Y99...</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  )
}
