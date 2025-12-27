import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticleSlugs } from '@/app/components/articles'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const { Content } = article

  return <Content />
}
