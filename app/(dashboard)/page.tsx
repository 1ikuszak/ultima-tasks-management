import MaxWidthWrapper from '@/components/max-width-wrapper'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { data } = await readUserSession()
  if (!data.session?.user) {
    return redirect('/auth/login')
  }
  if (data.session?.user.user_metadata.role === 'user') {
    return redirect('/tasks')
  }
  return (
    <div className="mb-6">
      <MaxWidthWrapper>
        <div className="flex-col hidden md:flex">
          <p>DashboardPage23</p>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
