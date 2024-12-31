'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

interface Expense {
  id: number
  name: string
  amount: number
  date: string
  description: string
}

interface EditExpenseProps {
  expense: Expense
  onComplete: () => void
  onCancel: () => void
}

export function EditExpense({ expense, onComplete, onCancel }: EditExpenseProps) {
  const [name, setName] = useState(expense.name)
  const [amount, setAmount] = useState(expense.amount.toString())
  const [date, setDate] = useState(expense.date)
  const [description, setDescription] = useState(expense.description)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/agritrack_project_expenses/${expense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          amount: parseFloat(amount),
          date,
          description,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update expense')
      }

      toast({
        title: "Succès",
        description: "La dépense a été modifiée avec succès",
      })
      onComplete()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la modification de la dépense",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="expense-name">Nom de la Dépense</Label>
        <Input
          id="expense-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expense-amount">Montant</Label>
        <Input
          id="expense-amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expense-date">Date</Label>
        <Input
          id="expense-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expense-description">Description</Label>
        <Textarea
          id="expense-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
        <Button type="submit">Enregistrer les modifications</Button>
      </div>
    </form>
  )
}

