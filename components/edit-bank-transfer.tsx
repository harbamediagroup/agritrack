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

interface BankTransfer {
  id: number
  type: 'Entrant' | 'Sortant'
  amount: number
  date: string
  description: string
}

interface EditBankTransferProps {
  transfer: BankTransfer
  onComplete: () => void
  onCancel: () => void
}

export function EditBankTransfer({ transfer, onComplete, onCancel }: EditBankTransferProps) {
  const [type, setType] = useState(transfer.type)
  const [amount, setAmount] = useState(transfer.amount.toString())
  const [date, setDate] = useState(transfer.date)
  const [description, setDescription] = useState(transfer.description)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/agritrack_bank_transfers/${transfer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          amount: parseFloat(amount),
          date,
          description,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update bank transfer')
      }

      toast({
        title: "Succès",
        description: "Le virement bancaire a été modifié avec succès",
      })
      onComplete()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la modification du virement bancaire",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Sélectionnez le type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Entrant">Argent Entrant</SelectItem>
            <SelectItem value="Sortant">Argent Sortant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Montant</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
        <Button type="submit">Enregistrer les modifications</Button>
      </div>
    </form>
  )
}

