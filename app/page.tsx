import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentExpenses } from "@/components/recent-expenses"
import { ProjectsOverview } from "@/components/projects-overview"
import { ExpensesOverview } from "@/components/expenses-overview"
import { BankTransfersOverview } from "@/components/bank-transfers-overview"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  // Fetch projects data
  const { data: projects } = await supabase
    .from('agritrack_projects')
    .select(`
      *,
      agritrack_project_expenses (
        amount
      )
    `)

  // Calculate metrics
  const totalProjects = projects?.length || 0
  const activeProjects = projects?.filter(p => p.status === 'en_cours').length || 0
  
  const totalExpenses = projects?.reduce((sum, project) => {
    const projectExpenses = project.agritrack_project_expenses.reduce((total, expense) => 
      total + (parseFloat(expense.amount) || 0), 0)
    return sum + projectExpenses
  }, 0) || 0

  const averageCostPerProject = totalProjects > 0 ? totalExpenses / totalProjects : 0

  // Get last month's data for comparison
  const lastMonthDate = new Date()
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
  
  const { data: lastMonthProjects } = await supabase
    .from('agritrack_projects')
    .select(`
      *,
      agritrack_project_expenses (
        amount
      )
    `)
    .lt('created_at', lastMonthDate.toISOString())

  const lastMonthTotalProjects = lastMonthProjects?.length || 0
  const lastMonthActiveProjects = lastMonthProjects?.filter(p => p.status === 'en_cours').length || 0
  
  const lastMonthTotalExpenses = lastMonthProjects?.reduce((sum, project) => {
    const projectExpenses = project.agritrack_project_expenses.reduce((total, expense) => 
      total + (parseFloat(expense.amount) || 0), 0)
    return sum + projectExpenses
  }, 0) || 0

  const lastMonthAverageCost = lastMonthTotalProjects > 0 ? lastMonthTotalExpenses / lastMonthTotalProjects : 0

  // Calculate changes
  const projectsChange = totalProjects - lastMonthTotalProjects
  const activeProjectsChange = activeProjects - lastMonthActiveProjects
  const expensesChangePercent = lastMonthTotalExpenses > 0 
    ? ((totalExpenses - lastMonthTotalExpenses) / lastMonthTotalExpenses * 100)
    : 0
  const averageCostChangePercent = lastMonthAverageCost > 0
    ? ((averageCostPerProject - lastMonthAverageCost) / lastMonthAverageCost * 100)
    : 0

  return (
    <div className="space-y-6 mx-4 md:mx-8">
      <h1 className="text-3xl font-bold tracking-tight">Aperçu</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Projets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {projectsChange >= 0 ? '+' : ''}{projectsChange} par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalExpenses.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}
            </div>
            <p className="text-xs text-muted-foreground">
              {expensesChangePercent >= 0 ? '+' : ''}{expensesChangePercent.toFixed(1)}% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              {activeProjectsChange >= 0 ? '+' : ''}{activeProjectsChange} par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coût Moyen/Projet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageCostPerProject.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}
            </div>
            <p className="text-xs text-muted-foreground">
              {averageCostChangePercent >= 0 ? '+' : ''}{averageCostChangePercent.toFixed(1)}% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Aperçu des Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dépenses Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentExpenses />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des Projets</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectsOverview />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des Dépenses Générales</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpensesOverview />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des Virements Bancaires</CardTitle>
          </CardHeader>
          <CardContent>
            <BankTransfersOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

