'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { EditProject } from '@/components/edit-project'

interface Project {
  id: string
  name: string
  status: string
  start_date: string
  updated_at: string
  size: string
  location: string
  total_expenses: number
}

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/agritrack_projects')
      const data = await response.json()
      setProjects(data.projects)
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        const response = await fetch(`/api/agritrack_projects/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          toast({
            title: "Succès",
            description: "Le projet a été supprimé avec succès",
          })
          fetchProjects()
        } else {
          throw new Error('Failed to delete project')
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression du projet",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
  }

  const handleEditComplete = () => {
    setEditingProject(null)
    fetchProjects()
  }

  if (isLoading) {
    return <div>Chargement des projets...</div>
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terminé':
        return 'default'
      case 'en_cours':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Dépenses Totales</TableHead>
            <TableHead>Taille (ha)</TableHead>
            <TableHead>Emplacement</TableHead>
            <TableHead>Date de Début</TableHead>
            <TableHead>Dernière Mise à Jour</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(project.status)}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(project.total_expenses)}</TableCell>
              <TableCell>{project.size}</TableCell>
              <TableCell>{project.location}</TableCell>
              <TableCell>{formatDate(project.start_date)}</TableCell>
              <TableCell>{formatDate(project.updated_at)}</TableCell>
              <TableCell>
                <Button asChild variant="ghost" size="sm" className="mr-2">
                  <Link href={`/dashboard/projects/${project.id}`}>Voir</Link>
                </Button>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(project)}>
                  Modifier
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingProject && (
        <EditProject
          project={editingProject}
          onComplete={handleEditComplete}
          onCancel={() => setEditingProject(null)}
        />
      )}
    </div>
  )
}

