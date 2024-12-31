'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GeneralExpensesList } from '@/components/general-expenses-list'

export default function GeneralExpensesPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchExpenses()
  }, [startDate, endDate])

  const fetchExpenses = async () => {
    setIsLoading(true)
    try {
      let url = '/api/agritrack_general_expenses'
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetch(url)
      const data = await response.json()
      setExpenses(data.expenses)
    } catch (error) {
      console.error('Erreur lors de la récupération des dépenses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dépenses Générales</h1>
        <Button asChild>
          <Link href="/dashboard/general-expenses/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une Dépense
          </Link>
        </Button>
      </div>
      <div className="flex gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="start-date">Date de début</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Date de fin</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <Button onClick={fetchExpenses}>Filtrer</Button>
      </div>
      {isLoading ? (
        <div>Chargement des dépenses...</div>
      ) : (
        <GeneralExpensesList expenses={expenses} />
      )}
    </div>
  )
}

