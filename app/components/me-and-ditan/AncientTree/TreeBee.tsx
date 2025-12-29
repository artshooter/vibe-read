'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCreatureFlight, generateFlightPath } from './useCreatureFlight'
import { useEffect, useState } from 'react'

interface TreeBeeProps {
  targetSelector: string // 目标文字的选择器
  initialPosition: { x: number; y: number } // 在树上的初始位置（相对于古树容器）
  size?: number
}

export default function TreeBee({
  targetSelector,
  initialPosition,
  size = 28
}: TreeBeeProps) {
  const [flightPath, setFlightPath] = useState<string>('')

  const {
    isFlying,
    hasArrived,
    targetPosition,
    treePosition,
    onFlightComplete
  } = useCreatureFlight({
    target: { id: 'bee', selector: targetSelector },
    treePosition: initialPosition,
    arrivalDelay: 1500
  })

  // 生成飞行路径
  useEffect(() => {
    if (isFlying && targetPosition) {
      const path = generateFlightPath(initialPosition, targetPosition)
      setFlightPath(path)
    }
  }, [isFlying, targetPosition, initialPosition])

  // 计算飞行时长
  const flightDuration = 2

  return (
    <AnimatePresence>
      {!hasArrived && (
        <motion.div
          className="absolute pointer-events-none"
          initial={{
            x: initialPosition.x,
            y: initialPosition.y,
            opacity: 1
          }}
          animate={
            isFlying && targetPosition
              ? {
                  x: targetPosition.x,
                  y: targetPosition.y,
                  opacity: 1,
                  transition: {
                    duration: flightDuration,
                    ease: [0.25, 0.1, 0.25, 1], // 自然的缓动曲线
                  }
                }
              : {
                  // 待机状态：轻微悬浮
                  y: [initialPosition.y, initialPosition.y - 5, initialPosition.y],
                  x: [initialPosition.x, initialPosition.x + 3, initialPosition.x],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }
          }
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.5 }
          }}
          onAnimationComplete={() => {
            if (isFlying) {
              onFlightComplete()
            }
          }}
        >
          <BeeSVG size={size} isFlying={isFlying} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 蜜蜂 SVG
function BeeSVG({ size, isFlying }: { size: number; isFlying: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 翅膀 - 飞行时加速扇动 */}
      <motion.ellipse
        cx="14"
        cy="16"
        rx="6"
        ry="4"
        fill="#e8e2d5"
        opacity="0.7"
        animate={{
          scaleY: [1, 0.6, 1],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: isFlying ? 0.05 : 0.1,
          repeat: Infinity,
        }}
      />
      <motion.ellipse
        cx="26"
        cy="16"
        rx="6"
        ry="4"
        fill="#e8e2d5"
        opacity="0.7"
        animate={{
          scaleY: [1, 0.6, 1],
          opacity: [0.7, 0.3, 0.7],
        }}
        transition={{
          duration: isFlying ? 0.05 : 0.1,
          repeat: Infinity,
          delay: 0.025,
        }}
      />
      {/* 身体 */}
      <ellipse cx="20" cy="22" rx="8" ry="10" fill="#c9a86c" />
      {/* 条纹 */}
      <rect x="12" y="18" width="16" height="2" fill="#3d3a35" opacity="0.6" />
      <rect x="12" y="23" width="16" height="2" fill="#3d3a35" opacity="0.6" />
      <rect x="12" y="28" width="16" height="2" fill="#3d3a35" opacity="0.6" />
      {/* 头 */}
      <circle cx="20" cy="10" r="5" fill="#3d3a35" />
      {/* 触角 */}
      <path d="M17 6 Q15 2 13 3" stroke="#3d3a35" strokeWidth="1" fill="none" />
      <path d="M23 6 Q25 2 27 3" stroke="#3d3a35" strokeWidth="1" fill="none" />
    </svg>
  )
}
