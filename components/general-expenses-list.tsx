'use client'

import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Expense {
  id: number
  type: string
  amount: number
  date: string
  notes?: string
}

interface GeneralExpensesListProps {
  expenses: Expense[]
  onExpenseDeleted: () => void
}

export function GeneralExpensesList({ expenses, onExpenseDeleted }: GeneralExpensesListProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
      try {
        const response = await fetch(`/api/agritrack_general_expenses/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          toast({
            title: "Succès",
            description: "La dépense a été supprimée avec succès",
          })
          onExpenseDeleted()
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

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpenses.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}</div>
          </CardContent>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.type}</TableCell>
              <TableCell>{expense.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{expense.notes}</TableCell>
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(expense.id)}>
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

