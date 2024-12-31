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
}

export function GeneralExpensesList({ expenses }: GeneralExpensesListProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.type}</TableCell>
              <TableCell>{expense.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{expense.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

