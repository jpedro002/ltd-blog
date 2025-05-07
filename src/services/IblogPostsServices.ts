import { IBlogPost, IBlogPostDetail } from './types'

export interface IBlogPostsServices {
	fetchPosts: () => Promise<IBlogPost[]>
	getPostBySlug: (slug: string) => Promise<IBlogPostDetail | null>
}
