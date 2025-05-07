import { blogPostsServices } from '@/services/blogPostsServices'
import { PostDetailView } from './PostDetail.view'

export default async function PostDetail({
	slug,
}: {
	slug: string
}) {
	const post = await blogPostsServices.getPostBySlug(slug)

	return <PostDetailView post={post} />
}
