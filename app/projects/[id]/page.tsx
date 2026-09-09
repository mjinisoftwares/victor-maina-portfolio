import { ProjectContent } from '@/components/ProjectContent'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params
  return <ProjectContent id={id} />
}
