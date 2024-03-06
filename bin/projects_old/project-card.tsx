'use client'

import React from 'react'
import { Icons } from '../../components/icons'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { FC } from 'react'
import { ProjectActions } from './project-actions'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MilestoneProgress from './milestone-progress'
import { calculateDaysRemaining } from '@/lib/utils'
import { Milestone } from '@/types/project'

interface ProjectCardProps {
  name: string
  milestones: Milestone[]
  project_id: string
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  milestones,
  project_id,
}) => {
  const getCurrentMilestone = () => {
    const lastCheckedIndex = milestones.map((m) => m.checked).lastIndexOf(true)
    return milestones[lastCheckedIndex + 1]
  }
  const currentMilestone = getCurrentMilestone()

  const daysToNextMilestone = currentMilestone
    ? calculateDaysRemaining(currentMilestone.deadline)
    : 0

  const lastMilestone = milestones[milestones.length - 1]
  const daysToLastMilestone = lastMilestone
    ? calculateDaysRemaining(lastMilestone.deadline)
    : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="space-y-1">
          <Badge>{name}</Badge>
          <p className="text-2xl font-semibold">
            {currentMilestone ? currentMilestone.name : 'No current milestone'}
          </p>
        </CardTitle>
        <Button asChild variant={'outline'} size={'sm'}>
          <Link href={`tasks/${project_id}`}>
            <Icons.tasks className="w-4 h-4 mr-4 text-muted-foreground" /> Tasks
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="mt-[2rem]">
        <MilestoneProgress milestones={milestones} />
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex items-center">
          <div className="flex gap-3">
            <div>
              <div className="flex items-center">
                <Icons.milestone className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>
                  <span className="text-xl font-semibold">
                    +{daysToNextMilestone}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    days
                  </span>
                </span>
              </div>
            </div>

            <span className="h-[24px] w-[2px] bg-slate-300 rounded-full"></span>

            <div>
              <div className="flex items-center">
                <Icons.calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                <span>
                  <span className="text-xl font-semibold">
                    +{daysToLastMilestone}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    days
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-1 ml-10">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadc.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shad.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/sss.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <ProjectActions project_id={project_id} />
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
