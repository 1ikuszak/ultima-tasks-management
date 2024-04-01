import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { TeamTasksOverview } from './team-tasks-overview'
import { ProjectWithMilestones, ProjectWithMilestonesSchema } from '@/schemas'
import { formatDate, getCurrentMilestone } from '@/lib/utils'
import { TimeProgressBar } from '../time-progress-bar'
import { Badge } from '../ui/badge'
import { MilestonesProgressChart } from './milestones-progress-chart'
import { MilestonesUpdateDialog } from './milestones-update-dialog'

interface projectCardProps {
  project: ProjectWithMilestones
}

export function ProjectCard({ project }: projectCardProps) {
  const currentMilestone = getCurrentMilestone(project.milestones)
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{currentMilestone?.title}</CardTitle>
          <CardDescription>{project.title}</CardDescription>
        </div>
        <div className="flex gap-1">
          <MilestonesUpdateDialog
            project_id={project.id!}
            milestones={project.milestones}
          />
          <Button size={'sm'}>Tasks</Button>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="gap-2">
          <div className="h-[120px]">
            <MilestonesProgressChart
              project_end={project.deadline}
              project_start={project.start_date}
              milestones={project.milestones}
            />
          </div>
          <div>
            <TeamTasksOverview />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="w-full flex items-center gap-4 justify-between">
          <Badge className="text-xs" variant={'outline'}>
            {formatDate(project.start_date)}
          </Badge>
          <TimeProgressBar
            start_date={project.start_date}
            end_date={project.deadline}
          />
          <Badge className="text-xs" variant={'outline'}>
            {formatDate(project.deadline)}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
