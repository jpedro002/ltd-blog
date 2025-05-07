import { blogPostsServices } from '@/services/blogPostsServices'
import { PostListView } from './PostList.view'

export async function PostList() {
	const posts = await blogPostsServices.fetchPosts()
	return <PostListView posts={posts} />
}
