'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FileText, Loader2 } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

interface Invoice {
  id: number
  file_url: string | string[]
  file_name: string
  created_at: string
}

export function InvoiceGallery({ projectId }: { projectId: string }) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  async function fetchInvoices() {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('agritrack_project_invoices')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les factures.',
          variant: 'destructive',
        })
        throw error
      }
      setInvoices(data || [])
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [projectId, supabase])

  const getFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return 'image'
    }
    return 'pdf'
  }

  const cleanUrl = (url: string | string[]) => {
    // Log the original URL for debugging
    console.log('Original URL:', url)

    // If it's an array, take the first item
    let cleanedUrl = Array.isArray(url) ? url[0] : url
    console.log('After array check:', cleanedUrl)

    // Extract the actual URL using regex
    const urlMatch = cleanedUrl.match(/https:\/\/[^"\s\]]+/);
    if (urlMatch) {
      cleanedUrl = urlMatch[0];
    }
    console.log('Final cleaned URL:', cleanedUrl)

    return cleanedUrl
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Chargement des factures...</span>
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Aucune facture n'a été téléchargée pour ce projet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Factures du Projet</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {invoices.map(invoice => {
          const url = cleanUrl(invoice.file_url)
          return (
            <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="truncate text-sm">
                  {invoice.file_name || `Facture ${new Date(invoice.created_at).toLocaleDateString('fr-FR')}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getFileType(url) === 'image' ? (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={url}
                      alt={`Facture ${invoice.id}`}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-md bg-muted">
                    <FileText className="h-20 w-20 text-muted-foreground" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(invoice.created_at).toLocaleDateString('fr-FR')}
                </span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Voir le Document
                </a>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

