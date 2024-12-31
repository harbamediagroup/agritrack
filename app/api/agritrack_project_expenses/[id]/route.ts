import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase
    .from('agritrack_project_expenses')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression de la dépense' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Dépense supprimée avec succès' })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  const { name, amount, date, description } = await request.json()

  if (!name || !amount || !date) {
    return NextResponse.json({ error: 'Le nom, le montant et la date sont requis' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('agritrack_project_expenses')
    .update({ name, amount, date, description })
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la modification de la dépense' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Dépense modifiée avec succès', expense: data[0] })
}

