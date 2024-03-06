import { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { UserLoginForm } from '@/components/auth/UserLoginForm'
import readUserSession from '@/lib/actions'
import { redirect } from 'next/navigation'
import Icon from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
}

export default async function AuthenticationPage() {
  const { data } = await readUserSession()
  if (data.session) {
    return redirect('/dashboard')
  }
  return (
    <>
      <div className="container relative flex flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/auth/register"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Register
        </Link>
        <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
          <div className="absolute inset-0 bg-stone-900" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <Icon name="sun-snow" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <footer className="text-sm">luki.zip</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                login back to account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below <br /> to login to your
                account
              </p>
            </div>
            <UserLoginForm />
          </div>
        </div>
      </div>
    </>
  )
}
