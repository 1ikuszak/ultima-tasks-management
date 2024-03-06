'use server'
import supabaseServer from '@/lib/supabase/server'

export async function getProfile() {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('profile')
      .select(`full_name, username, avatar_url`)
      .eq('id', user.id)
      .single()

    return {
      email: user.email,
      ...profile,
    }
  }
}
