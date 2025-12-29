'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export interface FlightTarget {
  id: string
  selector: string // CSS 选择器，用于定位目标元素
}

export interface CreatureState {
  isFlying: boolean
  hasArrived: boolean
  targetPosition: { x: number; y: number } | null
}

interface UseCreatureFlightOptions {
  target: FlightTarget
  treePosition: { x: number; y: number } // 古树上的初始位置
  onArrive?: () => void
  arrivalDelay?: number // 到达后消失的延迟时间
}

export function useCreatureFlight({
  target,
  treePosition,
  onArrive,
  arrivalDelay = 2000
}: UseCreatureFlightOptions) {
  const [state, setState] = useState<CreatureState>({
    isFlying: false,
    hasArrived: false,
    targetPosition: null
  })

  const hasTriggered = useRef(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // 计算目标元素的位置
  const getTargetPosition = useCallback(() => {
    const element = document.querySelector(target.selector)
    if (!element) return null

    const rect = element.getBoundingClientRect()
    // 返回元素左侧中间位置
    return {
      x: rect.left - 50, // 飞到文字左侧一点
      y: rect.top + rect.height / 2
    }
  }, [target.selector])

  // 触发飞行
  const triggerFlight = useCallback(() => {
    if (hasTriggered.current) return

    const targetPos = getTargetPosition()
    if (!targetPos) return

    hasTriggered.current = true
    setState({
      isFlying: true,
      hasArrived: false,
      targetPosition: targetPos
    })
  }, [getTargetPosition])

  // 飞行完成
  const onFlightComplete = useCallback(() => {
    setState(prev => ({
      ...prev,
      isFlying: false,
      hasArrived: true
    }))

    onArrive?.()

    // 到达后延迟消失
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        hasArrived: false,
        targetPosition: null
      }))
    }, arrivalDelay)
  }, [onArrive, arrivalDelay])

  // 设置 Intersection Observer
  useEffect(() => {
    const element = document.querySelector(target.selector)
    if (!element) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            // 元素进入视口，触发飞行
            triggerFlight()
          }
        })
      },
      {
        threshold: 0.5, // 元素50%可见时触发
        rootMargin: '-100px 0px' // 稍微延迟触发，确保用户看到
      }
    )

    observerRef.current.observe(element)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [target.selector, triggerFlight])

  // 重置函数（可选，用于重新触发动画）
  const reset = useCallback(() => {
    hasTriggered.current = false
    setState({
      isFlying: false,
      hasArrived: false,
      targetPosition: null
    })
  }, [])

  return {
    ...state,
    treePosition,
    onFlightComplete,
    reset
  }
}

// 生成贝塞尔曲线路径
export function generateFlightPath(
  start: { x: number; y: number },
  end: { x: number; y: number }
): string {
  // 计算控制点，模拟自然飞行弧线
  const midX = (start.x + end.x) / 2
  const midY = Math.min(start.y, end.y) - 100 // 向上弧线

  // 添加一些随机性
  const controlX1 = start.x + (midX - start.x) * 0.5 + (Math.random() - 0.5) * 50
  const controlY1 = midY + (Math.random() - 0.5) * 30
  const controlX2 = midX + (end.x - midX) * 0.5 + (Math.random() - 0.5) * 50
  const controlY2 = midY + (Math.random() - 0.5) * 30

  return `M ${start.x} ${start.y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${end.x} ${end.y}`
}
