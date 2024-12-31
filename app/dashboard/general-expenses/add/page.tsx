'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function AddGeneralExpensePage() {
  const router = useRouter()
  const [expenseType, setExpenseType] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/agritrack_general_expenses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: expenseType,
          amount: parseFloat(amount),
          date,
          notes,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add expense')
      }

      toast({
        title: "Succès",
        description: "La dépense générale a été ajoutée avec succès",
      })
      router.push('/dashboard/general-expenses')
      router.refresh()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout de la dépense générale",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 px-4 md:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Ajouter une Dépense Générale</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="expense-type">Type de Dépense</Label>
          <Select value={expenseType} onValueChange={setExpenseType} required>
            <SelectTrigger id="expense-type">
              <SelectValue placeholder="Sélectionnez le type de dépense" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="office-rent">Loyer du Bureau</SelectItem>
              <SelectItem value="utilities">Services Publics</SelectItem>
              <SelectItem value="insurance">Assurance</SelectItem>
              <SelectItem value="maintenance">Entretien</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Montant</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="Entrez le montant"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Entrez des notes supplémentaires"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <Button type="submit">Ajouter la Dépense</Button>
      </form>
    </div>
  )
}

