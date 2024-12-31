'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, FolderOpen, Settings, DollarSign, BanknoteIcon as Bank } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const items = [
  {
    title: "Aperçu",
    href: "/",
    icon: BarChart3
  },
  {
    title: "Projets",
    href: "/dashboard/projects",
    icon: FolderOpen
  },
  {
    title: "Dépenses Générales",
    href: "/dashboard/general-expenses",
    icon: DollarSign
  },
  {
    title: "Virements Bancaires",
    href: "/dashboard/bank-transfers",
    icon: Bank
  },
  {
    title: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings
  }
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1 p-4">
      {items.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start",
            pathname === item.href && "bg-muted font-medium"
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

