import { ServiceContent } from '@/components/ServiceContent'

interface ServicePageProps {
  params: Promise<{ id: string }>
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { id } = await params
  return <ServiceContent id={id} />
}
