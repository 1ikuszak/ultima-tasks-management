'use client'
import { Icons } from '../../components/icons'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import createSupabaseClient from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ProjectActionsProps {
  project_id: string
}

export function ProjectActions({ project_id }: ProjectActionsProps) {
  const deleteProject = () => {
    toast('project deleted')
  }

  const router = useRouter()
  const redirectToUpdate = () => {
    router.push(`/projects/${project_id}/update`)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Icons.settings className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={redirectToUpdate}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={deleteProject}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
