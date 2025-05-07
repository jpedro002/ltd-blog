import { RichTextRenderer } from '@/components/rich-text-renderer'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PostDetailViewProps } from './types'

export function PostDetailView(props: PostDetailViewProps) {
	const { post } = props

	if (!post) {
		notFound()
	}

	return (
		<div className="min-h-screen bg-white dark:bg-gray-950">
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-5xl mx-auto">
					<div className="flex flex-col lg:flex-row gap-8">
						<div className="lg:w-3/4">
							<div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 mb-8">
								<div className="flex justify-center mb-6">
									<div className="w-full max-h-96 overflow-hidden rounded-lg">
										<Image
											src={
												post?.coverImage.url || 'https://placehold.co/600x400'
											}
											alt={post.coverImage.description || ''}
											width={800}
											height={400}
											className="w-full h-auto object-cover"
										/>
									</div>
								</div>

								<div className="flex gap-2 mb-4">
									<span className="bg-purple-600 text-white text-xs font-medium px-4 py-1 rounded-full">
										{post.category.toUpperCase()}
									</span>
								</div>

								<h1 className="text-3xl font-bold mb-6">{post.title}</h1>

								<div className="prose prose-lg max-w-none dark:prose-invert">
									<RichTextRenderer content={post.content} />
								</div>
							</div>
						</div>

						<div className="lg:w-1/4 hidden md:block">
							<div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 sticky top-4">
								<h3 className="text-lg font-semibold mb-4">
									Table of Contents
								</h3>
								<nav className="space-y-3">
									{post.sections.map((section) => (
										<a
											key={section.id}
											href={`#${section.id}`}
											className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
										>
											{section.title}
										</a>
									))}
								</nav>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
