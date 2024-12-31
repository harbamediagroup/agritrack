import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { type, amount, date, description } = await request.json()

    if (!type || !amount || !date) {
      return NextResponse.json({ error: 'Le type, le montant et la date sont requis' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('agritrack_bank_transfers')
      .insert({ type, amount, date, description })
      .select()

    if (error) {
      console.error('Error adding bank transfer:', error)
      return NextResponse.json({ error: 'Erreur lors de l\'ajout du virement bancaire' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Virement bancaire ajouté avec succès', transfer: data[0] })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Une erreur inattendue s\'est produite' }, { status: 500 })
  }
}

