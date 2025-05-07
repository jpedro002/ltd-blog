import { BlogPostCardView } from './components/BlogPostCard/BlogPostCard'
import { PostListViewProps } from './types'

export async function PostListView(props: PostListViewProps) {
	const { posts } = props

	return (
		<div className="min-h-screen bg-white dark:bg-gray-950">
			<main className="container mx-auto px-4 py-8">
				<div className="text-center mb-12">
					<h1 className="text-2xl font-bold mb-4">Bits-Of-C0de</h1>
					<div className="flex items-center justify-center gap-2 text-5xl font-bold">
						<span>Explore</span>
						<span className="text-purple-600">Learn</span>
						<span>Build</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts?.map((post) => (
						<BlogPostCardView
							key={post.id}
							category={post.category}
							title={post.title}
							excerpt={post.excerpt}
							slug={post.slug}
							id={post.id}
							coverImage={post.coverImage}
							readTime={post.readTime}
						/>
					))}
					<BlogPostCardView
						key={123123}
						category={'JavaScript'}
						title={'JavaScript: The Definitive Guide'}
						excerpt={
							'JavaScript: The Definitive Guide is a comprehensive guide to the JavaScript programming language, covering everything from the basics to advanced topics. It is a must-read for any JavaScript developer.'
						}
						slug={'javascript-guide'}
						id={'123123'}
						coverImage={{
							url: 'https://placehold.co/600x400',
							title: 'JavaScript Guide',
							description: 'A comprehensive guide to JavaScript.',
						}}
						readTime={'5 min read'}
					/>
				</div>
			</main>
		</div>
	)
}
