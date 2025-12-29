'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales, localeNames, Locale } from '@/i18n/config'

export default function LanguageSwitch() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            locale === l
              ? 'bg-white text-black shadow-lg'
              : 'bg-transparent text-gray-400 border border-gray-600 hover:border-white hover:text-white'
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  )
}
