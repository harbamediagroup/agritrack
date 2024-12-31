import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectList } from '@/components/project-list'

export default function ProjectsPage() {
  return (
    <div className="space-y-6 px-4 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projets</h1>
        <Button asChild>
          <Link href="/dashboard/projects/add-project">
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un Projet
          </Link>
        </Button>
      </div>
      <ProjectList />
    </div>
  )
}

