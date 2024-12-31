import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const expenses = [
  {
    project: "Entretien du Tracteur",
    amount: 420,
    date: "2024-01-01",
  },
  {
    project: "Système d'Irrigation",
    amount: 1200,
    date: "2024-01-02",
  },
  {
    project: "Réparation de la Moissonneuse",
    amount: 850,
    date: "2024-01-03",
  },
  {
    project: "Équipement de Fertilisation",
    amount: 320,
    date: "2024-01-04",
  },
  {
    project: "Installation de Stockage",
    amount: 2300,
    date: "2024-01-05",
  },
]

export function RecentExpenses() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Projet</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.date}>
            <TableCell className="font-medium">{expense.project}</TableCell>
            <TableCell>{expense.amount} MAD</TableCell>
            <TableCell>{expense.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

