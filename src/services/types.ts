export interface IBlogPost {
	id: string
	title: string
	slug: string
	excerpt: string
	category: string
	readTime: string
	createdAt: string
	updatedAt: string
	content: any // Rich Text content
	coverImage: {
		url: string
		title?: string
		description?: string
		width?: number
		height?: number
	}
	meta: {
		title: string
		description: string
	}
}

export interface IBlogPostDetail extends IBlogPost {
	sections: {
		title: string
		id: string
	}[]
}
