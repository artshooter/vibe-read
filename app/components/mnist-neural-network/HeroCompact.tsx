'use client'

import { useTranslations } from 'next-intl'

export default function HeroCompact() {
  const t = useTranslations('mnist-neural-network')

  return (
    <div className="relative overflow-hidden rounded-lg border border-[#8be9fd]/20 bg-[#0d0d0d] p-6 transition-all hover:border-[#8be9fd]/40 hover:shadow-lg hover:shadow-[#8be9fd]/10">
      {/* Terminal header */}
      <div className="mb-4 flex items-center gap-2 border-b border-[#6272a4]/30 pb-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5555]"></div>
          <div className="h-3 w-3 rounded-full bg-[#f1fa8c]"></div>
          <div className="h-3 w-3 rounded-full bg-[#50fa7b]"></div>
        </div>
        <div className="font-mono text-xs text-[#6272a4]">
          mnist_tutorial.sh
        </div>
      </div>

      {/* Terminal content */}
      <div className="font-mono text-sm">
        <div className="mb-3 text-[#50fa7b]">
          $ ./mnist --info
        </div>
        <div className="mb-2 text-white">
          {t('metadata.title')}
        </div>
        <div className="mb-4 text-[#e5e7eb]/80 text-xs leading-relaxed">
          {t('metadata.description')}
        </div>

        {/* ASCII art preview */}
        <div className="text-[#8be9fd] text-xs leading-tight opacity-60">
          <pre>{`┌─────────┐   ┌─────────┐   ┌─────────┐
│ Input   │──▶│ Layers  │──▶│ Output  │
│ [28x28] │   │ Process │   │ [0-9]   │
└─────────┘   └─────────┘   └─────────┘`}</pre>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {['机器学习', '神经网络', '教程'].map((tag) => (
          <span
            key={tag}
            className="rounded bg-[#50fa7b]/10 px-2 py-1 font-mono text-xs text-[#50fa7b]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
