import { getProfile } from '@/app/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import supabaseServer from '@/lib/supabase/server'
import { cipher } from '@/lib/utils'
import { redirect } from 'next/navigation'

export async function UserNav() {
  const user = await getProfile()

  const logout = async () => {
    'use server'
    const supabase = await supabaseServer()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.avatar_url} alt={`@${user?.username}`} />
            <AvatarFallback>
              {user?.email ? cipher(user.email).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {user?.full_name}
            </p>
            <p className="text-sm font-medium leading-none">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={logout}>
          <Button size={'sm'} variant={'outline'}>
            SignOut
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
