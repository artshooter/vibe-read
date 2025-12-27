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
    <div className="fixed top-4 right-4 flex gap-2">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`px-3 py-1 rounded text-sm transition ${
            locale === l ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  )
}
