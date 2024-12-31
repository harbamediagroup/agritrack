import Image from 'next/image'
import { FileText } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// This would typically come from your database
const mockInvoices = [
  { id: 1, name: 'Facture-001.pdf', type: 'pdf', url: '#' },
  { id: 2, name: 'Facture-002.jpg', type: 'image', url: '/placeholder.svg' },
  { id: 3, name: 'Facture-003.png', type: 'image', url: '/placeholder.svg' },
]

export function InvoiceGallery({ projectId }: { projectId: string }) {
  // In a real application, you would fetch the invoices for the specific project here

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Factures du Projet</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockInvoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardHeader>
              <CardTitle className="truncate">{invoice.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {invoice.type === 'image' ? (
                <Image
                  src={invoice.url}
                  alt={invoice.name}
                  width={300}
                  height={200}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="flex h-[200px] items-center justify-center rounded-md bg-muted">
                  <FileText className="h-20 w-20 text-muted-foreground" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <a
                href={invoice.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Voir le Document
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

