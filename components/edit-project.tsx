'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'

interface Project {
  id: string
  name: string
  status: string
  description: string
  start_date: string
  end_date: string | null
  size: string
  location: string
}

interface EditProjectProps {
  project: Project
  onComplete: () => void
  onCancel: () => void
}

export function EditProject({ project, onComplete, onCancel }: EditProjectProps) {
  const [name, setName] = useState(project.name)
  const [status, setStatus] = useState(project.status)
  const [description, setDescription] = useState(project.description)
  const [startDate, setStartDate] = useState(project.start_date)
  const [endDate, setEndDate] = useState(project.end_date || '')
  const [size, setSize] = useState(project.size)
  const [location, setLocation] = useState(project.location)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/agritrack_projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          status,
          description,
          start_date: startDate,
          end_date: endDate || null,
          size,
          location,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      toast({
        title: "Succès",
        description: "Le projet a été modifié avec succès",
      })
      onComplete()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la modification du projet",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du Projet</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Statut</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Sélectionnez le statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planifié">Planifié</SelectItem>
            <SelectItem value="en_cours">En Cours</SelectItem>
            <SelectItem value="terminé">Terminé</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="size">Taille (en hectares)</Label>
        <Input
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Ex: 5.5"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Emplacement</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ex: Secteur Nord"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="start-date">Date de Début</Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="end-date">Date de Fin (optionnelle)</Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
        <Button type="submit">Enregistrer les modifications</Button>
      </div>
    </form>
  )
}

