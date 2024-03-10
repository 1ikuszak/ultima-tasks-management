import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UpdateMilestonesForm } from './update-milestones-form'
import { Milestone } from '@/app/data/schema'

interface editMilestonesDialogProps {
  milestones: Milestone[]
}

export function EditMilestonesDialog({
  milestones,
}: editMilestonesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Milestones</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <UpdateMilestonesForm milestones={milestones} />
      </DialogContent>
    </Dialog>
  )
}
