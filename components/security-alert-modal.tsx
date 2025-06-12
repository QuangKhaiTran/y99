"use client"

import { AlertTriangle } from "lucide-react"

interface SecurityAlertModalProps {
  isOpen: boolean
  message: string
  onClose: () => void
}

export default function SecurityAlertModal({ isOpen, message, onClose }: SecurityAlertModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="enhanced-card rounded-3xl p-10 max-w-md w-full shadow-2xl scale-in">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-6">
            <AlertTriangle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Cảnh báo bảo mật</h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">{message}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white py-4 px-8 rounded-xl font-bold transition-all duration-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
