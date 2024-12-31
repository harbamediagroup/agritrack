import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase
    .from('agritrack_bank_transfers')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression du virement bancaire' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Virement bancaire supprimé avec succès' })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  const { type, amount, date, description } = await request.json()

  if (!type || !amount || !date) {
    return NextResponse.json({ error: 'Le type, le montant et la date sont requis' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('agritrack_bank_transfers')
    .update({ type, amount, date, description })
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la modification du virement bancaire' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Virement bancaire modifié avec succès', transfer: data[0] })
}

