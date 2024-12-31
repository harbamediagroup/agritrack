import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Parse the request body
  const { name, status, description, start_date, end_date, size, location } = await request.json()

  // Validate input
  if (!name || !status || !start_date || !size || !location) {
    return NextResponse.json({ 
      error: 'Le nom, le statut, la date de début, la taille et l\'emplacement sont requis' 
    }, { status: 400 })
  }

  // Insert the new project
  const { data, error } = await supabase
    .from('agritrack_projects')
    .insert({
      name,
      status,
      description,
      start_date,
      end_date,
      size,
      location,
    })
    .select()

  if (error) {
    console.error('Error adding project:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'ajout du projet' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Projet ajouté avec succès', project: data[0] })
}

