import { client } from '@/lib/contentful'
import { Document } from '@contentful/rich-text-types'
import { IBlogPostsServices } from './IblogPostsServices'
import { IBlogPost } from './types'

export const blogPostsServices: IBlogPostsServices = {
	fetchPosts: async () => {
		const response = await client.getEntries({
			content_type: 'blogPost',
			include: 2,
		})

		return adaptBlogPostCollectionFromContentful(response)
	},

	getPostBySlug: async (slug: string) => {
		const response = await client.getEntries({
			content_type: 'blogPost',
			'fields.slug': slug,
			include: 2,
		})

		if (!response.items.length) {
			return null
		}

		const post = adaptBlogPostFromContentful(response.items[0])

		const sections = extractSectionsFromRichText(post.content)

		return {
			...post,
			sections,
		}
	},
}

export function adaptBlogPostFromContentful(item: any): IBlogPost {
	console.log('item url', item.fields.coverImage?.fields?.file?.url)

	return {
		id: item.sys.id,
		title: item.fields.title,
		slug: item.fields.slug,
		excerpt: item.fields.excerpt,
		category: item.fields.category || '',
		readTime: item.fields.readTime || '5 min read',
		createdAt: item.sys.createdAt,
		updatedAt: item.sys.updatedAt,
		content: item.fields.content,
		coverImage: {
			url: item.fields.coverImage?.fields?.file?.url
				? item.fields.coverImage.fields.file.url
				: 'https://placehold.co/600x400',
			title: item.fields.coverImage?.fields?.title,
			description: item.fields.coverImage?.fields?.description,
			width: item.fields.coverImage?.fields?.file?.details?.image?.width,
			height: item.fields.coverImage?.fields?.file?.details?.image?.height,
		},
		meta: {
			title: item.fields.metaTitle || item.fields.title,
			description: item.fields.metaDescription || item.fields.excerpt,
		},
	}
}

export function adaptBlogPostCollectionFromContentful(
	response: any,
): IBlogPost[] {
	return response.items.map((item: any) => adaptBlogPostFromContentful(item))
}

function extractSectionsFromRichText(content: Document) {
	const sections = []

	if (!content || !content.content) {
		return []
	}

	for (const node of content.content) {
		if (node.nodeType === 'heading-2' && node.content && node.content[0]) {
			if (node.content[0].nodeType === 'text') {
				const textNode = node.content[0] as { value: string }
				const title = textNode.value
				const id = title
					.toLowerCase()
					.replace(/[^\w\s]/gi, '')
					.replace(/\s+/g, '-')
				sections.push({ title, id })
			}
		}
	}

	return sections
}
