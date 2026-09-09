import { BlogPostContent } from '@/components/BlogPostContent'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  return <BlogPostContent slug={slug} />
}
