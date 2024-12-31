'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { EditExpense } from '@/components/edit-expense'

interface Expense {
  id: number
  name: string
  amount: number
  date: string
  description: string
}

interface ProjectExpensesProps {
  projectId: string
  startDate?: string
  endDate?: string
}

export function ProjectExpenses({ projectId, startDate, endDate }: ProjectExpensesProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  useEffect(() => {
    if (projectId) {
      fetchExpenses()
    }
  }, [projectId, startDate, endDate])

  const fetchExpenses = async () => {
    try {
      let url = `/api/agritrack_projects/${projectId}/expenses`
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }
      const data = await response.json()
      setExpenses(data.expenses || [])
    } catch (error) {
      console.error('Error fetching expenses:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les dépenses",
        variant: "destructive",
      })
      setExpenses([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      try {
        const response = await fetch(`/api/agritrack_project_expenses/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          toast({
            title: "Succès",
            description: "La dépense a été supprimée avec succès",
          })
          fetchExpenses()
        } else {
          throw new Error('Failed to delete expense')
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression de la dépense",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense)
  }

  const handleEditComplete = () => {
    setEditingExpense(null)
    fetchExpenses()
  }

  if (isLoading) {
    return <div>Chargement des dépenses...</div>
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dépenses du Projet</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom de la Dépense</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses && expenses.length > 0 ? (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>{formatCurrency(expense.amount)}</TableCell>
                <TableCell>{new Date(expense.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(expense)}>
                    Modifier
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(expense.id)}>
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Aucune dépense trouvée pour cette période
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editingExpense && (
        <EditExpense
          expense={editingExpense}
          onComplete={handleEditComplete}
          onCancel={() => setEditingExpense(null)}
        />
      )}
    </div>
  )
}

