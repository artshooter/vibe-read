export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* 加载旋转器 */}
        <div className="w-12 h-12 border-4 border-gray-700 border-t-white rounded-full animate-spin" />

        {/* 加载文本 */}
        <p className="text-gray-400 text-sm animate-pulse">Loading article...</p>
      </div>
    </div>
  )
}
