import Link from 'next/link'
import MaxWidthWrapper from '../max-width-wrapper'
import NavItems from './nav-items'
import MobileNav from './mobile-nav'
import { UserNav } from './user-nav'
import readUserSession from '@/lib/actions'
import { ModeToggle } from './mode-toggle'
import { FullScreenToggle } from './full-screen-toggle'
import { Icons } from '../icons'

const Navbar = async () => {
  const { data: userSession } = await readUserSession()
  if (userSession.session) {
    const isAdmin = userSession.session.user?.user_metadata.role === 'admin'
    return (
      <div className="sticky inset-x-0 top-0 z-50 h-16 bg-background">
        <header className="relative">
          <MaxWidthWrapper>
            <div className="border-b border-muted-foreground/20">
              <div className="flex items-center h-16">
                <MobileNav />

                <div className="flex ml-4 lg:ml-0">
                  <Link href="/">
                    <span className="flex items-center gap-3">
                      <Icons.logo />
                      <span className="font-semibold">
                        Ultima
                        <span className="text-xs"> Tasks</span>
                      </span>
                    </span>
                  </Link>
                </div>

                <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                  <NavItems isAdmin={isAdmin} />
                </div>

                <div className="flex items-center ml-auto space-x-2">
                  <FullScreenToggle />
                  <ModeToggle />
                  <UserNav />
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </header>
      </div>
    )
  }
}

export default Navbar
