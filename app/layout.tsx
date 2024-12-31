import { DashboardNav } from '@/components/dashboard-nav'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: 'Agri Tracker - Gestion des Dépenses d\'Équipement',
  description: 'Suivez et gérez efficacement vos dépenses d\'équipement agricole',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4 lg:px-8">
            <div className="text-xl font-bold">Agri Tracker</div>
          </header>

          <div className="flex-1 flex">
            <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
              <DashboardNav />
            </aside>
            
            <main className="flex-1 overflow-y-auto">
              <div className="container py-6">
                {children}
              </div>
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

