import createSupabaseClient from '@/lib/supabase/server'
import { Button } from '../ui/button'
import { redirect } from 'next/navigation'

export default function SignOut() {
  const logout = async () => {
    'use server'
    const supabase = await createSupabaseClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <form action={logout}>
      <Button>SignOut</Button>
    </form>
  )
}
