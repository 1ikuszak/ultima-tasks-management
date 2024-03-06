'use client'
import { marketingConfig } from '@/config/marketing'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NavItems = ({ isAdmin }: { isAdmin: boolean }) => {
  const path = usePathname()

  return (
    <div className="flex gap-1.5 h-full items-center justify-center">
      {marketingConfig.mainNav.map((item) => {
        if (item.access == 'admin' && !isAdmin) {
          return null
        }
        return (
          <Button
            asChild
            variant={'link'}
            key={item.title}
            className={cn(
              path === item.href
                ? 'text-muted-foreground'
                : 'text-muted-foreground/60'
            )}
          >
            <Link href={item.href}>{item.title}</Link>
          </Button>
        )
      })}
    </div>
  )
}

export default NavItems
