import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface ProjectExpense {
  amount: string
}

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  const { data: projects, error } = await supabase
    .from('agritrack_projects')
    .select(`
      id,
      name,
      status,
      description,
      start_date,
      end_date,
      size,
      location,
      updated_at,
      agritrack_project_expenses (
        amount
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des projets' }, { status: 500 })
  }

  const projectsWithTotalExpenses = projects.map(project => ({
    ...project,
    total_expenses: project.agritrack_project_expenses.reduce((sum: number, expense: ProjectExpense) => sum + (parseFloat(expense.amount) || 0), 0)
  }))

  return NextResponse.json({ projects: projectsWithTotalExpenses })
}

