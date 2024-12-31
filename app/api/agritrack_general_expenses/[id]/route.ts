import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase
    .from('agritrack_general_expenses')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression de la dépense générale' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Dépense générale supprimée avec succès' })
}
