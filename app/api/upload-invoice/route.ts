import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const projectId = formData.get('projectId') as string | null

  if (!file || !projectId) {
    return NextResponse.json({ error: 'Fichier ou ID de projet manquant' }, { status: 400 })
  }

  // Here you would typically:
  // 1. Upload the file to a storage service (e.g., AWS S3)
  // 2. Save the file metadata and project association in your database

  // For now, we'll just simulate a successful upload
  console.log(`Simulation de téléchargement: ${file.name} pour le projet ${projectId}`)

  return NextResponse.json({ message: 'Facture téléchargée avec succès' }, { status: 200 })
}

