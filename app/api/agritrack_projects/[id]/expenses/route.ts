import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const supabase = createRouteHandlerClient({ cookies })

  let query = supabase
    .from('agritrack_project_expenses')
    .select('*')
    .eq('project_id', params.id)
    .order('date', { ascending: false })

  if (startDate) {
    query = query.gte('date', startDate)
  }
  if (endDate) {
    query = query.lte('date', endDate)
  }

  const { data: expenses, error } = await query

  if (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des dépenses', expenses: [] },
      { status: 500 }
    )
  }

  return NextResponse.json({ expenses: expenses || [] })
}

