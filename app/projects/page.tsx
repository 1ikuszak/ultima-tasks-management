import MaxWidthWrapper from '@/components/max-width-wrapper'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function ProjectPage() {
  const { data } = await readUserSession()
  if (!data.session?.user) {
    return redirect('/auth/login')
  }
  return (
    <div className="mb-6">
      <MaxWidthWrapper>
        <div className="flex-col hidden md:flex">
          <p>ProjectPage</p>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
