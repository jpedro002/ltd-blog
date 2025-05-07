import { PostList } from './PostList'

export default function Page() {
	return <PostList />
}

export const revalidate = 3600

export const metadata = {
	title: 'PostList',
	description: 'PostList page',
}
