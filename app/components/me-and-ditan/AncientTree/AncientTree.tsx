'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TreeSVG from './TreeSVG'
import TreeBee from './TreeBee'
import TreeLadybug from './TreeLadybug'

// 目标文字的选择器 ID
export const CREATURE_TARGETS = {
  bee: 'creature-target-bee',
  ladybug: 'creature-target-ladybug'
} as const

interface AncientTreeProps {
  className?: string
}

export default function AncientTree({ className = '' }: AncientTreeProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showCreatures, setShowCreatures] = useState(false)

  // 监听滚动，更新树叶摇曳
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0
    setScrollProgress(progress)

    // 开始阅读后（滚动超过 200px）显示昆虫
    if (scrollY > 200 && !showCreatures) {
      setShowCreatures(true)
    }
  }, [showCreatures])

  useEffect(() => {
    // 节流处理
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  // 检测屏幕宽度，移动端隐藏
  useEffect(() => {
    const checkWidth = () => {
      setIsVisible(window.innerWidth >= 1024)
    }

    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className={`fixed right-0 top-0 h-screen pointer-events-none z-20 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
      style={{ width: '280px' }}
    >
      {/* 古树容器 - 放大并裁切 */}
      <div className="relative w-full h-full">
        {/* 渐变遮罩 - 让树与背景融合 */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(245, 242, 235, 0.2) 60%, rgba(245, 242, 235, 0.6) 100%)'
          }}
        />

        {/* 古树 SVG - 放大显示，只看到部分 */}
        <div
          className="absolute opacity-60"
          style={{
            width: '500px',
            height: '140%',
            top: '-10%',
            left: '-150px'
          }}
        >
          <TreeSVG scrollProgress={scrollProgress} />
        </div>

        {/* 昆虫 - 开始阅读后逐渐出现 */}
        <AnimatePresence>
          {showCreatures && (
            <>
              {/* 蜜蜂 - 在树叶处 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <TreeBee
                  targetSelector={`#${CREATURE_TARGETS.bee}`}
                  initialPosition={{ x: 120, y: 200 }}
                  size={28}
                />
              </motion.div>

              {/* 瓢虫 - 在树干上 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <TreeLadybug
                  targetSelector={`#${CREATURE_TARGETS.ladybug}`}
                  initialPosition={{ x: 80, y: 380 }}
                  size={24}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
