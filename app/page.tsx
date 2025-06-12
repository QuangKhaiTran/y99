"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/login-form"
import ParticleBackground from "@/components/particle-background"
import SecurityStatus from "@/components/security-status"
import RoleDisplayModal from "@/components/role-display-modal"
import SecurityAlertModal from "@/components/security-alert-modal"
import type { User, SessionData } from "@/types/auth"
import { authenticateUser, initializeDefaultUsers, ROLE_PERMISSIONS } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showSecurityAlert, setShowSecurityAlert] = useState(false)
  const [securityMessage, setSecurityMessage] = useState("")
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLockedOut, setIsLockedOut] = useState(false)

  const maxLoginAttempts = 5
  const lockoutTime = 300000 // 5 minutes

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("y99_logged_in")
    if (isLoggedIn === "true") {
      router.push("/dashboard")
      return
    }

    initializeDefaultUsers()
    checkAccountLockout()
  }, [router])

  const checkAccountLockout = () => {
    const lockoutEnd = localStorage.getItem("lockoutEnd")
    if (lockoutEnd && new Date().getTime() < Number.parseInt(lockoutEnd)) {
      setIsLockedOut(true)
      const remainingTime = Math.ceil((Number.parseInt(lockoutEnd) - new Date().getTime()) / 1000)
      showSecurityAlertMessage(
        `Tài khoản tạm thời bị khóa. Vui lòng thử lại sau ${Math.ceil(remainingTime / 60)} phút.`,
      )
      return true
    }
    return false
  }

  const showSecurityAlertMessage = (message: string) => {
    setSecurityMessage(message)
    setShowSecurityAlert(true)
  }

  const generateDeviceFingerprint = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.textBaseline = "top"
      ctx.font = "14px Arial"
      ctx.fillText("Device fingerprint", 2, 2)
    }

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
    ].join("|")

    return btoa(fingerprint).slice(0, 32)
  }

  const handleLogin = async (
    username: string,
    password: string,
    captchaInput: string,
    captchaCode: string,
    trustDevice: boolean,
  ) => {
    if (isLockedOut) {
      showSecurityAlertMessage("Tài khoản đang bị khóa tạm thời. Vui lòng thử lại sau.")
      return { success: false }
    }

    if (captchaInput.toUpperCase() !== captchaCode) {
      return { success: false, error: "Mã CAPTCHA không chính xác. Vui lòng thử lại." }
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const user = authenticateUser(username, password)

      if (user) {
        setLoginAttempts(0)
        localStorage.removeItem("loginAttempts")
        localStorage.removeItem("lockoutEnd")

        const deviceFingerprint = generateDeviceFingerprint()

        const sessionData: SessionData = {
          userId: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          permissions: ROLE_PERMISSIONS[user.role] || [],
          loginTime: new Date().toISOString(),
          deviceFingerprint: deviceFingerprint,
        }

        localStorage.setItem("y99_logged_in", "true")
        localStorage.setItem("y99_session", JSON.stringify(sessionData))

        if (trustDevice) {
          localStorage.setItem("trustedDevice_" + deviceFingerprint, "true")
        }

        setAuthenticatedUser(user)
        setShowRoleModal(true)

        setTimeout(() => {
          router.push("/dashboard")
        }, 3000)

        return { success: true }
      } else {
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)
        localStorage.setItem("loginAttempts", newAttempts.toString())

        if (newAttempts >= maxLoginAttempts) {
          const lockoutEnd = new Date().getTime() + lockoutTime
          localStorage.setItem("lockoutEnd", lockoutEnd.toString())
          setIsLockedOut(true)
          showSecurityAlertMessage(`Quá nhiều lần đăng nhập sai. Tài khoản bị khóa tạm thời 5 phút để đảm bảo bảo mật.`)
        } else {
          showSecurityAlertMessage(
            `Thông tin đăng nhập không chính xác. Còn lại ${maxLoginAttempts - newAttempts} lần thử.`,
          )
        }

        return { success: false, error: "Thông tin đăng nhập không chính xác." }
      }
    } catch (error) {
      console.error("Login error:", error)
      showSecurityAlertMessage("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.")
      return { success: false, error: "Có lỗi xảy ra trong quá trình đăng nhập." }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen login-bg transition-all duration-500">
      <ParticleBackground />
      <SecurityStatus />

      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-lg w-full space-y-8">
          <LoginForm onLogin={handleLogin} isLoading={isLoading} isLockedOut={isLockedOut} />

          <div className="text-center space-y-4 fade-in">
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="font-medium">Được bảo vệ bởi mã hóa SSL 256-bit</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">© 2025 Y99 CO.,LTD. All rights reserved.</div>
          </div>
        </div>
      </div>

      <RoleDisplayModal isOpen={showRoleModal} user={authenticatedUser} onClose={() => setShowRoleModal(false)} />

      <SecurityAlertModal
        isOpen={showSecurityAlert}
        message={securityMessage}
        onClose={() => setShowSecurityAlert(false)}
      />
    </div>
  )
}
