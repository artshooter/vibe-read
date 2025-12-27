import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitch from '@/app/components/common/LanguageSwitch'

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <LanguageSwitch />

      <h1 className="text-6xl font-bold mb-4">{t('home.welcome')}</h1>
      <p className="text-xl text-gray-400 mb-8">{t('home.subtitle')}</p>

      <div className="flex gap-4">
        <Link
          href="/resume"
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
        >
          Resume
        </Link>
      </div>
    </main>
  )
}
