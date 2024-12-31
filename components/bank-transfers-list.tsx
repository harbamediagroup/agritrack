'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { EditBankTransfer } from '@/components/edit-bank-transfer'

interface BankTransfer {
  id: number
  type: 'Entrant' | 'Sortant'
  amount: number
  date: string
  description: string
}

export function BankTransfersList() {
  const [transfers, setTransfers] = useState<BankTransfer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingTransfer, setEditingTransfer] = useState<BankTransfer | null>(null)

  useEffect(() => {
    fetchTransfers()
  }, [])

  const fetchTransfers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/agritrack_bank_transfers')
      if (!response.ok) {
        throw new Error('Failed to fetch bank transfers')
      }
      const data = await response.json()
      setTransfers(data.transfers)
    } catch (error) {
      console.error('Erreur lors de la récupération des virements:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les virements bancaires",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce virement ?')) {
      try {
        const response = await fetch(`/api/agritrack_bank_transfers/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          toast({
            title: "Succès",
            description: "Le virement bancaire a été supprimé avec succès",
          })
          fetchTransfers()
        } else {
          throw new Error('Failed to delete bank transfer')
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression du virement bancaire",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (transfer: BankTransfer) => {
    setEditingTransfer(transfer)
  }

  const handleEditComplete = () => {
    setEditingTransfer(null)
    fetchTransfers()
  }

  if (isLoading) {
    return <div>Chargement des virements bancaires...</div>
  }

  const totalIn = transfers
    .filter(t => t.type === 'Entrant')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalOut = transfers
    .filter(t => t.type === 'Sortant')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIn - totalOut

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entrant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalIn)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sortant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalOut)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(balance)}
            </div>
          </CardContent>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transfers.map((transfer) => (
            <TableRow key={transfer.id}>
              <TableCell>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                    transfer.type === 'Entrant'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {transfer.type}
                </span>
              </TableCell>
              <TableCell className={`font-medium ${
                transfer.type === 'Entrant' ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(transfer.amount)}
              </TableCell>
              <TableCell>{transfer.description}</TableCell>
              <TableCell>{new Date(transfer.date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(transfer)}>
                  Modifier
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(transfer.id)}>
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingTransfer && (
        <EditBankTransfer
          transfer={editingTransfer}
          onComplete={handleEditComplete}
          onCancel={() => setEditingTransfer(null)}
        />
      )}
    </div>
  )
}

