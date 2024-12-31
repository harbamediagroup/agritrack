import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BankTransfersList } from '@/components/bank-transfers-list'

export default function BankTransfersPage() {
  return (
    <div className="space-y-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Virements Bancaires</h1>
        <Button asChild>
          <Link href="/dashboard/bank-transfers/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une Entrée Bancaire
          </Link>
        </Button>
      </div>
      <BankTransfersList />
    </div>
  )
}

