import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Icons } from '../icons'
import { AddProjectForm } from './add-project-form'

export function AddProject() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Icons.addProject className="mr-2" /> Add Project
        </Button>
      </SheetTrigger>
      <SheetContent className="w-screen sm:w-[640px] sm:max-w-none overflow-auto">
        <SheetHeader>
          <SheetTitle>Add Project</SheetTitle>
        </SheetHeader>
        <div className="flex justify-center mt-10 sm:justify-start">
          <AddProjectForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
