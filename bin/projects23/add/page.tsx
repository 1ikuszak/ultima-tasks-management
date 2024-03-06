import MaxWidthWrapper from '@/components/max-width-wrapper'
import { ProjectForm } from '@/bin/projects_old/project-form'
import { Separator } from '@/components/ui/separator'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function page() {
  const { data } = await readUserSession()
  if (!data.session) {
    return redirect('/auth/login')
  }

  return (
    <div className="my-6">
      <MaxWidthWrapper>
        {/* <Button variant={'outline'} asChild>
          <Link href={'/projects'}>
            <Icons.chevron_left className="w-4 h-4 mr-2" /> go back
          </Link>
        </Button> */}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium">New Project</h3>
            <p className="text-sm text-muted-foreground">
              Fill the form with necessary information
            </p>
          </div>
          <Separator />
          <ProjectForm />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
