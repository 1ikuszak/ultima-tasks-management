import { Icons } from '@/components/icons'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import ProjectCard from '@/bin/projects_old/project-card'
import { Button } from '@/components/ui/button'
import readUserSession from '@/lib/actions'
import { Milestone } from '@/types/project'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function page() {
  const { data } = await readUserSession()
  if (!data.session) {
    return redirect('/auth/login')
  }

  const DummyMilestones: Milestone[] = [
    {
      id: 1,
      name: 'Milestone 1',
      deadline: '2024-11-22',
      index: 0,
      checked: false,
      project_id: '300cc5d3-f82f-46da-a8ba-81adb0e58bec',
    },
    {
      id: 2,
      name: 'Milestone 2',
      deadline: '2024-06-07',
      index: 1,
      checked: true,
      project_id: '801b3381-a024-4a7b-ac3a-48a28f9b036d',
    },
    {
      id: 3,
      name: 'Milestone 3',
      deadline: '2024-12-31',
      index: 2,
      checked: false,
      project_id: 'e7be2fb9-2cc5-493f-8b2b-fb821561a2aa',
    },
    {
      id: 4,
      name: 'Milestone 4',
      deadline: '2024-05-31',
      index: 3,
      checked: true,
      project_id: '3d874d96-f870-4448-aae5-3dd824a55883',
    },
    {
      id: 5,
      name: 'Milestone 5',
      deadline: '2024-06-04',
      index: 4,
      checked: true,
      project_id: '24602243-a12c-4ef8-84aa-5b8a3abeefc2',
    },
    {
      id: 6,
      name: 'Milestone 6',
      deadline: '2024-04-27',
      index: 5,
      checked: false,
      project_id: '0763ce04-cf26-4f40-9b5a-df26c5103d01',
    },
  ]

  return (
    <div className="py-10">
      <MaxWidthWrapper>
        <Button asChild>
          <Link href={'projects/add'}>
            <Icons.logo className="mr-2" /> New Project
          </Link>
        </Button>
        <div className="grid gap-4 mt-4 gird-cols-1 lg:grid-cols-2">
          <ProjectCard
            key={1}
            milestones={DummyMilestones}
            name={'name1'}
            project_id={'dasdasdas'}
          />
          <ProjectCard
            key={1}
            milestones={DummyMilestones}
            name={'name1'}
            project_id={'dasdasdas'}
          />
          <ProjectCard
            key={1}
            milestones={DummyMilestones}
            name={'name1'}
            project_id={'dasdasdas'}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
