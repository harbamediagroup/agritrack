'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

export default function AddProjectExpensePage({ params }: { params: { projectId: string } }) {
  const router = useRouter()
  const [expenseName, setExpenseName] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseDate, setExpenseDate] = useState('')
  const [expenseDescription, setExpenseDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`/api/agritrack_projects/${params.projectId}/add-expense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: expenseName,
          amount: parseFloat(expenseAmount),
          date: expenseDate,
          description: expenseDescription,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add expense')
      }

      toast({
        title: "Succès",
        description: "La dépense a été ajoutée avec succès",
      })
      router.push(`/dashboard/projects/${params.projectId}`)
      router.refresh()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout de la dépense",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 px-4 md:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Ajouter une Dépense de Projet</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="expense-name">Nom de la Dépense</Label>
          <Input
            id="expense-name"
            placeholder="Entrez le nom de la dépense"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expense-amount">Montant</Label>
          <Input
            id="expense-amount"
            type="number"
            step="0.01"
            placeholder="Entrez le montant"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expense-date">Date</Label>
          <Input
            id="expense-date"
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expense-description">Description</Label>
          <Textarea
            id="expense-description"
            placeholder="Entrez la description de la dépense"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
          />
        </div>
        <Button type="submit">Ajouter la Dépense</Button>
      </form>
    </div>
  )
}

