import { Suspense } from 'react'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InvoiceUploader } from '@/components/invoice-uploader'
import { InvoiceGallery } from '@/components/invoice-gallery'

export default function ProjectInvoicesPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="space-y-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Factures du Projet</h1>
        <Button asChild>
          <Link href={`/dashboard/projects/${params.projectId}`}>
            Retour au Projet
          </Link>
        </Button>
      </div>
      <InvoiceUploader projectId={params.projectId} />
      <Suspense fallback={<div>Chargement des factures...</div>}>
        <InvoiceGallery projectId={params.projectId} />
      </Suspense>
    </div>
  )
}

