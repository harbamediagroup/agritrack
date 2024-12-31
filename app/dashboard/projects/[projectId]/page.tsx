'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { PlusCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProjectExpenses } from '@/components/project-expenses'
import { Card } from '@/components/ui/card'

interface Project {
  id: string
  name: string
  status: string
  size: string
  location: string
  total_expenses: number
  updated_at: string
}

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchProjectDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/agritrack_projects/${params.projectId}`)
      const data = await response.json()
    
      // Calculate total expenses from all project expenses
      const totalExpenses = data.expenses?.reduce((sum: number, expense: any) => sum + expense.amount, 0) || 0
    
      // Update the project data with calculated total
      setProject({
        ...data.project,
        total_expenses: totalExpenses
      })
    } catch (error) {
      console.error('Error fetching project details:', error)
    }
  }, [params.projectId])

  useEffect(() => {
    fetchProjectDetails()
  }, [fetchProjectDetails])

  if (!project) {
    return <div>Chargement...</div>
  }

  return (
    <div className="space-y-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <div className="flex gap-4">
          <Button asChild>
            <Link href={`/dashboard/projects/${project.id}/add-expense`}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une Dépense
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/dashboard/projects/${project.id}/invoices`}>
              <FileText className="mr-2 h-4 w-4" />
              Gérer les Factures
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="p-4">
          <div className="text-sm font-medium">Statut</div>
          <div className="text-2xl font-bold">{project.status}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Taille</div>
          <div className="text-2xl font-bold">{project.size} ha</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Emplacement</div>
          <div className="text-2xl font-bold">{project.location}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Dépenses Totales</div>
          <div className="text-2xl font-bold">{project.total_expenses?.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' }) ?? 0}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium">Dernière Mise à Jour</div>
          <div className="text-2xl font-bold">
            {new Date(project.updated_at).toLocaleDateString('fr-FR')}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="start-date">Date de début</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">Date de fin</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <ProjectExpenses 
          projectId={project.id} 
          startDate={startDate} 
          endDate={endDate}
        />
      </div>
    </div>
  )
}

