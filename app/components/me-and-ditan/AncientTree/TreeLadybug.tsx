'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCreatureFlight } from './useCreatureFlight'
import { useState } from 'react'

interface TreeLadybugProps {
  targetSelector: string
  initialPosition: { x: number; y: number }
  size?: number
}

export default function TreeLadybug({
  targetSelector,
  initialPosition,
  size = 26
}: TreeLadybugProps) {
  const [isWingsOpen, setIsWingsOpen] = useState(false)

  const {
    isFlying,
    hasArrived,
    targetPosition,
    onFlightComplete
  } = useCreatureFlight({
    target: { id: 'ladybug', selector: targetSelector },
    treePosition: initialPosition,
    arrivalDelay: 1500
  })

  // 飞行时展开翅膀
  const handleAnimationStart = () => {
    if (isFlying) {
      setIsWingsOpen(true)
    }
  }

  return (
    <AnimatePresence>
      {!hasArrived && (
        <motion.div
          className="absolute pointer-events-none"
          initial={{
            x: initialPosition.x,
            y: initialPosition.y,
            opacity: 1,
            rotate: 0
          }}
          animate={
            isFlying && targetPosition
              ? {
                  x: targetPosition.x,
                  y: targetPosition.y,
                  rotate: -15, // 飞行时稍微倾斜
                  opacity: 1,
                  transition: {
                    duration: 2.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }
                }
              : {
                  // 待机状态：在树枝上缓慢爬行
                  x: [initialPosition.x, initialPosition.x + 8, initialPosition.x],
                  rotate: [0, 5, 0, -3, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }
          }
          exit={{
            opacity: 0,
            scale: 0.8,
            y: initialPosition.y - 20,
            transition: { duration: 0.5 }
          }}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={() => {
            if (isFlying) {
              onFlightComplete()
              setIsWingsOpen(false)
            }
          }}
        >
          <LadybugSVG size={size} isFlying={isFlying} wingsOpen={isWingsOpen} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 瓢虫 SVG
function LadybugSVG({
  size,
  isFlying,
  wingsOpen
}: {
  size: number
  isFlying: boolean
  wingsOpen: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 翅膀（飞行时展开） */}
      <motion.ellipse
        cx="10"
        cy="20"
        rx="10"
        ry="5"
        fill="#c9a86c"
        initial={{ opacity: 0, rotate: 0 }}
        animate={
          wingsOpen
            ? {
                opacity: [0, 0.7, 0.7],
                rotate: [-35, -35, -35],
                scaleY: [1, 0.8, 1],
              }
            : { opacity: 0 }
        }
        transition={{
          opacity: { duration: 0.3 },
          rotate: { duration: 0.3 },
          scaleY: { duration: 0.1, repeat: isFlying ? Infinity : 0 }
        }}
        style={{ transformOrigin: '20px 20px' }}
      />
      <motion.ellipse
        cx="30"
        cy="20"
        rx="10"
        ry="5"
        fill="#c9a86c"
        initial={{ opacity: 0, rotate: 0 }}
        animate={
          wingsOpen
            ? {
                opacity: [0, 0.7, 0.7],
                rotate: [35, 35, 35],
                scaleY: [1, 0.8, 1],
              }
            : { opacity: 0 }
        }
        transition={{
          opacity: { duration: 0.3 },
          rotate: { duration: 0.3 },
          scaleY: { duration: 0.1, repeat: isFlying ? Infinity : 0, delay: 0.05 }
        }}
        style={{ transformOrigin: '20px 20px' }}
      />

      {/* 身体 */}
      <ellipse cx="20" cy="22" rx="12" ry="14" fill="#8b3a3a" />

      {/* 中线 */}
      <line x1="20" y1="8" x2="20" y2="36" stroke="#3d3a35" strokeWidth="1" />

      {/* 斑点 */}
      <circle cx="14" cy="16" r="2.5" fill="#3d3a35" />
      <circle cx="26" cy="16" r="2.5" fill="#3d3a35" />
      <circle cx="12" cy="24" r="2" fill="#3d3a35" />
      <circle cx="28" cy="24" r="2" fill="#3d3a35" />
      <circle cx="15" cy="30" r="2" fill="#3d3a35" />
      <circle cx="25" cy="30" r="2" fill="#3d3a35" />

      {/* 头 */}
      <circle cx="20" cy="6" r="5" fill="#3d3a35" />

      {/* 触角 */}
      <path d="M17 3 Q14 0 12 2" stroke="#3d3a35" strokeWidth="1" fill="none" />
      <path d="M23 3 Q26 0 28 2" stroke="#3d3a35" strokeWidth="1" fill="none" />

      {/* 腿 - 飞行时收起 */}
      <motion.g
        animate={
          !isFlying
            ? { rotate: [0, 2, -2, 0] }
            : { opacity: 0.3 }
        }
        transition={{ duration: 0.3, repeat: !isFlying ? Infinity : 0 }}
        style={{ transformOrigin: '20px 22px' }}
      >
        <path d="M10 18 L4 14" stroke="#3d3a35" strokeWidth="1.5" />
        <path d="M10 22 L3 22" stroke="#3d3a35" strokeWidth="1.5" />
        <path d="M10 26 L4 30" stroke="#3d3a35" strokeWidth="1.5" />
        <path d="M30 18 L36 14" stroke="#3d3a35" strokeWidth="1.5" />
        <path d="M30 22 L37 22" stroke="#3d3a35" strokeWidth="1.5" />
        <path d="M30 26 L36 30" stroke="#3d3a35" strokeWidth="1.5" />
      </motion.g>
    </svg>
  )
}
