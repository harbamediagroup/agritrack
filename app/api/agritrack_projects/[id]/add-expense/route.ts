import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  // Parse the request body
  const { name, amount, description, date } = await request.json()

  // Validate input
  if (!name || !amount || !date) {
    return NextResponse.json({ error: 'Le nom, le montant et la date sont requis' }, { status: 400 })
  }

  // Insert the new expense
  const { data, error } = await supabase
    .from('agritrack_project_expenses')
    .insert({
      project_id: params.id,
      name,
      amount,
      description,
      date,
    })
    .select()

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'ajout de la dépense' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Dépense ajoutée avec succès', expense: data[0] })
}

