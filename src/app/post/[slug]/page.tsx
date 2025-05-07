import PostDetail from './PostDetail'

export default function Page({
	params,
}: {
	params: { slug: string }
}) {
	return <PostDetail slug={params.slug} />
}

export const metadata = {
	title: 'PostDetail',
	description: 'PostDetail page',
}
