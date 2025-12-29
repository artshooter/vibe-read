'use client'

import { motion } from 'framer-motion'

interface TreeSVGProps {
  scrollProgress: number // 0-1 滚动进度，用于树叶摇曳
  className?: string
}

export default function TreeSVG({ scrollProgress, className = '' }: TreeSVGProps) {
  // 根据滚动方向计算树叶摇曳角度
  const leafSway = Math.sin(scrollProgress * Math.PI * 6) * 4

  return (
    <svg
      className={className}
      viewBox="0 0 300 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* 定义滤镜 - 水墨效果 */}
      <defs>
        <filter id="ink-texture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
        <linearGradient id="trunk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a4540" />
          <stop offset="50%" stopColor="#3d3a35" />
          <stop offset="100%" stopColor="#2a2725" />
        </linearGradient>
        <linearGradient id="branch-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a4540" />
          <stop offset="100%" stopColor="#5a5550" />
        </linearGradient>
      </defs>

      {/* 树干 - 苍老斑驳粗壮 */}
      <g filter="url(#ink-texture)">
        {/* 主树干 - 更粗更长 */}
        <path
          d="M140 850
             Q130 750 138 650
             Q145 550 135 450
             Q125 350 140 280
             Q150 220 142 160
             Q138 120 148 80"
          stroke="url(#trunk-gradient)"
          strokeWidth="45"
          fill="none"
          strokeLinecap="round"
        />
        {/* 树干纹理 - 斑驳裂纹 */}
        <path
          d="M130 800 Q140 700 125 600 Q135 500 120 400"
          stroke="#2a2725"
          strokeWidth="3"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M150 780 Q145 650 155 550 Q148 450 160 350"
          stroke="#2a2725"
          strokeWidth="2"
          fill="none"
          opacity="0.25"
        />
        <path
          d="M135 700 Q142 620 130 540"
          stroke="#3d3a35"
          strokeWidth="1.5"
          fill="none"
          opacity="0.2"
        />
      </g>

      {/* 主要树枝 - 更粗更有力 */}
      <g filter="url(#ink-texture)">
        {/* 右上大枝 */}
        <path
          d="M142 160 Q180 130 230 100 Q270 80 300 60"
          stroke="url(#branch-gradient)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />
        {/* 左上大枝 */}
        <path
          d="M140 200 Q100 170 50 150 Q10 135 -20 120"
          stroke="url(#branch-gradient)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        {/* 右中枝 */}
        <path
          d="M135 300 Q175 280 220 260 Q260 245 290 230"
          stroke="url(#branch-gradient)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        {/* 左中枝 */}
        <path
          d="M140 380 Q95 360 50 350 Q10 342 -30 335"
          stroke="url(#branch-gradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {/* 右下枝 */}
        <path
          d="M138 480 Q170 465 210 450 Q240 440 270 430"
          stroke="url(#branch-gradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        {/* 小分枝 */}
        <path
          d="M230 100 Q260 75 285 50"
          stroke="#5a5550"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M220 260 Q250 240 275 215"
          stroke="#5a5550"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M50 150 Q25 130 0 115"
          stroke="#5a5550"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* 树叶群 - 分层动画，更大更丰富 */}
      {/* 第一层叶子 - 右上顶部 */}
      <motion.g
        animate={{ rotate: leafSway }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{ transformOrigin: '250px 80px' }}
      >
        <LeafCluster cx={260} cy={50} scale={1.8} opacity={0.9} />
        <LeafCluster cx={290} cy={70} scale={1.4} opacity={0.85} />
        <LeafCluster cx={240} cy={90} scale={1.6} opacity={0.88} />
        <LeafCluster cx={275} cy={100} scale={1.2} opacity={0.82} />
      </motion.g>

      {/* 第二层叶子 - 左上 */}
      <motion.g
        animate={{ rotate: -leafSway * 0.8 }}
        transition={{ type: 'spring', stiffness: 80, damping: 25 }}
        style={{ transformOrigin: '30px 140px' }}
      >
        <LeafCluster cx={30} cy={120} scale={1.6} opacity={0.85} />
        <LeafCluster cx={0} cy={145} scale={1.3} opacity={0.8} />
        <LeafCluster cx={55} cy={155} scale={1.4} opacity={0.87} />
        <LeafCluster cx={-15} cy={130} scale={1.1} opacity={0.75} />
      </motion.g>

      {/* 第三层叶子 - 右中 */}
      <motion.g
        animate={{ rotate: leafSway * 0.6 }}
        transition={{ type: 'spring', stiffness: 90, damping: 22 }}
        style={{ transformOrigin: '240px 250px' }}
      >
        <LeafCluster cx={250} cy={220} scale={1.5} opacity={0.82} />
        <LeafCluster cx={280} cy={245} scale={1.2} opacity={0.78} />
        <LeafCluster cx={230} cy={260} scale={1.3} opacity={0.8} />
        <LeafCluster cx={265} cy={270} scale={1} opacity={0.75} />
      </motion.g>

      {/* 第四层叶子 - 左中 */}
      <motion.g
        animate={{ rotate: -leafSway * 0.7 }}
        transition={{ type: 'spring', stiffness: 85, damping: 23 }}
        style={{ transformOrigin: '30px 360px' }}
      >
        <LeafCluster cx={35} cy={340} scale={1.3} opacity={0.75} />
        <LeafCluster cx={10} cy={365} scale={1.1} opacity={0.7} />
        <LeafCluster cx={55} cy={355} scale={1} opacity={0.72} />
      </motion.g>

      {/* 第五层叶子 - 右下 */}
      <motion.g
        animate={{ rotate: leafSway * 0.5 }}
        transition={{ type: 'spring', stiffness: 75, damping: 28 }}
        style={{ transformOrigin: '230px 440px' }}
      >
        <LeafCluster cx={240} cy={420} scale={1.2} opacity={0.7} />
        <LeafCluster cx={265} cy={445} scale={1} opacity={0.65} />
        <LeafCluster cx={220} cy={455} scale={0.9} opacity={0.68} />
      </motion.g>

      {/* 零星散叶 - 树干周围 */}
      <motion.g
        animate={{ rotate: leafSway * 1.2 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        style={{ transformOrigin: '140px 250px' }}
      >
        <Leaf cx={160} cy={180} rotation={-30} scale={1} opacity={0.5} />
        <Leaf cx={115} cy={220} rotation={45} scale={0.9} opacity={0.45} />
        <Leaf cx={165} cy={320} rotation={-15} scale={0.85} opacity={0.48} />
        <Leaf cx={110} cy={420} rotation={20} scale={0.8} opacity={0.4} />
      </motion.g>
    </svg>
  )
}

// 叶子簇组件
function LeafCluster({
  cx,
  cy,
  scale = 1,
  opacity = 0.8
}: {
  cx: number
  cy: number
  scale?: number
  opacity?: number
}) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`} opacity={opacity}>
      {/* 多片叶子组成的簇 */}
      <ellipse cx="0" cy="0" rx="18" ry="10" fill="#5a6b4a" transform="rotate(-20)" />
      <ellipse cx="8" cy="-5" rx="15" ry="8" fill="#6b7c5e" transform="rotate(15)" />
      <ellipse cx="-6" cy="6" rx="14" ry="7" fill="#4a5a3e" transform="rotate(-45)" />
      <ellipse cx="5" cy="8" rx="12" ry="6" fill="#5a6b4a" transform="rotate(30)" />
      {/* 叶子高光 */}
      <ellipse cx="2" cy="-2" rx="8" ry="4" fill="#7a8b6e" transform="rotate(0)" opacity="0.4" />
    </g>
  )
}

// 单片叶子
function Leaf({
  cx,
  cy,
  rotation = 0,
  scale = 1,
  opacity = 0.7
}: {
  cx: number
  cy: number
  rotation?: number
  scale?: number
  opacity?: number
}) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={12 * scale}
      ry={6 * scale}
      fill="#6b7c5e"
      opacity={opacity}
      transform={`rotate(${rotation} ${cx} ${cy})`}
    />
  )
}
