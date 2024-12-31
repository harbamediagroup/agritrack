'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

export function InvoiceUploader({ projectId }: { projectId: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('projectId', projectId)

    try {
      const response = await fetch('/api/upload-invoice', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Échec du téléchargement')
      }

      toast({
        title: 'Succès',
        description: 'La facture a été téléchargée avec succès.',
      })
      router.refresh()
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      toast({
        title: 'Erreur',
        description: 'Une erreur s\'est produite lors du téléchargement de la facture.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Télécharger une Nouvelle Facture</h2>
      <div className="flex items-center gap-4">
        <Input
          type="file"
          id="invoice-upload"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleUpload}
          disabled={isUploading}
          className="max-w-sm"
        />
        <Button disabled={isUploading}>
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? 'Téléchargement...' : 'Télécharger'}
        </Button>
      </div>
    </div>
  )
}

