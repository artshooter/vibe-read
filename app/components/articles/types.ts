import { ComponentType } from 'react'

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  status: 'draft' | 'published'
}

export interface Article {
  meta: ArticleMeta
  Hero: ComponentType<{ inHome?: boolean }>
  HeroCompact: ComponentType
  Content: ComponentType
}
