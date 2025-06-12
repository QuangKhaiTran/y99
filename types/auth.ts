export interface User {
  id: number
  username: string
  password: string
  fullName: string
  email: string
  role: "admin" | "manager" | "employee" | "viewer"
  isActive: boolean
  createdAt: string
  lastLogin: string | null
}

export interface SessionData {
  userId: number
  username: string
  fullName: string
  email: string
  role: string
  permissions: string[]
  loginTime: string
  deviceFingerprint: string
}
