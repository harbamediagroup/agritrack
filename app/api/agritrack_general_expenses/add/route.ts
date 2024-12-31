import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  const { type, amount, date, notes } = await request.json()

  if (!type || !amount || !date) {
    return NextResponse.json({ error: 'Le type, le montant et la date sont requis' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('agritrack_general_expenses')
    .insert({ type, amount, date, notes })
    .select()

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'ajout de la dépense générale' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Dépense générale ajoutée avec succès', expense: data[0] })
}

