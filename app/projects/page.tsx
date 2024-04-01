import MaxWidthWrapper from '@/components/max-width-wrapper'
import { AddProject } from '@/components/projects/add-project'
import { ProjectCard } from '@/components/projects/project-card'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation'
import { getProjectWithMilestones } from './actions'
import { z } from 'zod'
import { ProjectWithMilestonesSchema } from '@/schemas'

export default async function ProjectPage() {
  const { data } = await readUserSession()
  if (!data.session?.user) {
    return redirect('/auth/login')
  }

  const response = await getProjectWithMilestones()
  const projects = z.array(ProjectWithMilestonesSchema).parse(response.data)

  return (
    <div className="flex flex-col min-h-screen mb-6">
      <MaxWidthWrapper>
        <div className="mt-4">
          <AddProject />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {projects.map((project) => {
            return (
              <div className="flex" key={project.id}>
                <ProjectCard key={project.id} project={project} />
              </div>
            )
          })}
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
