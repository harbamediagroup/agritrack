import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let query = supabase
      .from('agritrack_bank_transfers')
      .select('*')
      .order('date', { ascending: false })

    if (startDate) {
      query = query.gte('date', startDate)
    }
    if (endDate) {
      query = query.lte('date', endDate)
    }

    const { data: transfers, error } = await query

    if (error) {
      console.error('Error fetching bank transfers:', error)
      return NextResponse.json({ error: 'Erreur lors de la récupération des virements bancaires' }, { status: 500 })
    }

    return NextResponse.json({ transfers: transfers || [] })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Une erreur inattendue s\'est produite' }, { status: 500 })
  }
}

