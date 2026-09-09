import { TemplateContent } from '@/components/TemplateContent'

interface TemplatePageProps {
  params: Promise<{ id: string }>
}

export default async function TemplateDetailPage({ params }: TemplatePageProps) {
  const { id } = await params
  return <TemplateContent id={id} />
}
