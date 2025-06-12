export default function SecurityStatus() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center space-x-2 glass-effect rounded-xl px-4 py-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-green-500 rounded-full security-indicator"></div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Kết nối HTTPS bảo mật</span>
        </div>
      </div>
    </div>
  )
}
