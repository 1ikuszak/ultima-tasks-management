import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MilestonesUpdateForm } from './milestones-update-form'
import { Milestone } from '@/schemas/index'

interface editMilestonesDialogProps {
  milestones: Milestone[]
  project_id: string
}

export function MilestonesUpdateDialog({
  milestones,
  project_id,
}: editMilestonesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Milestones</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[860px]">
        <MilestonesUpdateForm project_id={project_id} milestones={milestones} />
      </DialogContent>
    </Dialog>
  )
}
