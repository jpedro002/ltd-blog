import { IBlogPost } from '@/services/types'

export type BlogPostCardProps = {
	id: string
	title: string
	slug: string
	excerpt: string
	category: string
	readTime: string
	coverImage: Pick<IBlogPost['coverImage'], 'url' | 'title' | 'description'>
}
