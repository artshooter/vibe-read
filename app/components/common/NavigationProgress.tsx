'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function NavigationProgress() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // 监听链接点击
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const targetPath = new URL(link.href).pathname
        if (targetPath !== pathname) {
          setLoading(true)
        }
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [pathname])

  // 当 pathname 变化时，说明导航完成
  useEffect(() => {
    setLoading(false)
  }, [pathname])

  if (!loading) return null

  return (
    <>
      {/* 顶部进度条 */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-transparent">
        <div className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-[progress_1.5s_ease-in-out_infinite]" />
      </div>

      {/* 轻量遮罩 - 防止重复点击 */}
      <div className="fixed inset-0 z-[9998] bg-black/10 backdrop-blur-[0.5px]" />

      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
            width: 30%;
          }
          50% {
            width: 70%;
          }
          100% {
            transform: translateX(400%);
            width: 30%;
          }
        }
      `}</style>
    </>
  )
}
