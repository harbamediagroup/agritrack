'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function InvoiceUploader({ projectId }: { projectId: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState<string>('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    toast({
      title: 'Téléchargement en cours',
      description: 'Veuillez patienter pendant le téléchargement des fichiers...',
    })

    try {
      setProgress('Téléchargement des fichiers...')
      // Upload files to Supabase Storage
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${projectId}/${Date.now()}.${fileExt}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('invoices-agritrack')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('invoices-agritrack')
          .getPublicUrl(fileName)

        return {
          url: publicUrl,
          name: file.name
        }
      })

      const fileData = await Promise.all(uploadPromises)
      const fileUrls = fileData.map(f => f.url)
      const fileNames = fileData.map(f => f.name)

      setProgress('Mise à jour de la base de données...')
      // Update the project_invoices table with the new URLs and file names
      const { error: dbError } = await supabase
        .from('agritrack_project_invoices')
        .insert({
          project_id: projectId,
          file_url: fileUrls,
          file_name: fileNames[0], // If multiple files, using first file name
          file_type: fileNames[0].split('.').pop()?.toLowerCase() // Add file type
        })

      if (dbError) throw dbError

      toast({
        title: 'Succès',
        description: `${files.length} fichier${files.length > 1 ? 's' : ''} téléchargé${files.length > 1 ? 's' : ''} avec succès.`,
        variant: 'default',
      })
      
      // Clear the input
      event.target.value = ''
      
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      toast({
        title: 'Erreur',
        description: 'Une erreur s\'est produite lors du téléchargement des factures.',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
      setProgress('')
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
          multiple // Allow multiple file selection
        />
        <Button disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {progress || 'Téléchargement...'}
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Télécharger
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

