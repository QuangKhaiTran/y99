import type { User } from "@/types/auth"

export const PERMISSIONS = {
  VIEW_LOANS: "VIEW_LOANS",
  ADD_LOAN: "ADD_LOAN",
  EDIT_LOAN: "EDIT_LOAN",
  DELETE_LOAN: "DELETE_LOAN",
  VIEW_ANALYSIS: "VIEW_ANALYSIS",
  MANAGE_USERS: "MANAGE_USERS",
  EXPORT_DATA: "EXPORT_DATA",
  PRINT_DATA: "PRINT_DATA",
} as const

export const ROLE_PERMISSIONS = {
  admin: [
    PERMISSIONS.VIEW_LOANS,
    PERMISSIONS.ADD_LOAN,
    PERMISSIONS.EDIT_LOAN,
    PERMISSIONS.DELETE_LOAN,
    PERMISSIONS.VIEW_ANALYSIS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.PRINT_DATA,
  ],
  manager: [
    PERMISSIONS.VIEW_LOANS,
    PERMISSIONS.ADD_LOAN,
    PERMISSIONS.EDIT_LOAN,
    PERMISSIONS.DELETE_LOAN,
    PERMISSIONS.VIEW_ANALYSIS,
    PERMISSIONS.EXPORT_DATA,
    PERMISSIONS.PRINT_DATA,
  ],
  employee: [PERMISSIONS.VIEW_LOANS, PERMISSIONS.ADD_LOAN, PERMISSIONS.VIEW_ANALYSIS],
  viewer: [PERMISSIONS.VIEW_LOANS, PERMISSIONS.VIEW_ANALYSIS],
}

export function initializeDefaultUsers() {
  if (typeof window === "undefined") return

  const existingUsers = JSON.parse(localStorage.getItem("y99_users") || "[]")

  if (existingUsers.length === 0) {
    const defaultUsers: User[] = [
      {
        id: 1,
        username: "admin",
        password: "admin123",
        fullName: "Quản trị viên",
        email: "admin@y99.vn",
        role: "admin",
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null,
      },
      {
        id: 2,
        username: "manager",
        password: "manager123",
        fullName: "Trưởng phòng",
        email: "manager@y99.vn",
        role: "manager",
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null,
      },
      {
        id: 3,
        username: "employee",
        password: "employee123",
        fullName: "Nhân viên",
        email: "employee@y99.vn",
        role: "employee",
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null,
      },
    ]

    localStorage.setItem("y99_users", JSON.stringify(defaultUsers))
  }
}

export function authenticateUser(username: string, password: string): User | null {
  if (typeof window === "undefined") return null

  const users: User[] = JSON.parse(localStorage.getItem("y99_users") || "[]")
  const user = users.find((u) => u.username === username && u.password === password && u.isActive)

  if (user) {
    // Update last login
    user.lastLogin = new Date().toISOString()
    const userIndex = users.findIndex((u) => u.id === user.id)
    users[userIndex] = user
    localStorage.setItem("y99_users", JSON.stringify(users))

    return user
  }
  return null
}
