import MaxWidthWrapper from '@/components/max-width-wrapper'
import { ProjectCard } from '@/components/projects/project_card'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function ProjectPage() {
  const { data } = await readUserSession()
  if (!data.session?.user) {
    return redirect('/auth/login')
  }
  return (
    <div className="flex flex-col min-h-screen mb-6">
      <MaxWidthWrapper>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
