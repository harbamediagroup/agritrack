import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  const { data: project, error: projectError } = await supabase
    .from('agritrack_projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (projectError) {
    return NextResponse.json({ error: 'Erreur lors de la récupération du projet' }, { status: 500 })
  }

  if (!project) {
    return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
  }

  const { data: expenses, error: expensesError } = await supabase
    .from('agritrack_project_expenses')
    .select('*')
    .eq('project_id', params.id)
    .order('date', { ascending: false })

  if (expensesError) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des dépenses' }, { status: 500 })
  }

  return NextResponse.json({ project, expenses })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase
    .from('agritrack_projects')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression du projet' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Projet supprimé avec succès' })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  const { name, status, description, start_date, end_date, size, location } = await request.json()

  if (!name || !status || !start_date || !size || !location) {
    return NextResponse.json({ 
      error: 'Le nom, le statut, la date de début, la taille et l\'emplacement sont requis' 
    }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('agritrack_projects')
    .update({ name, status, description, start_date, end_date, size, location })
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la modification du projet' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Projet modifié avec succès', project: data[0] })
}

