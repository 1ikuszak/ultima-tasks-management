'use server'

import createSupabaseClient from '../supabase/server'
import { unstable_noStore as noStore } from 'next/cache'

export default async function readUserSession() {
  noStore()
  const supabase = await createSupabaseClient()
  return supabase.auth.getSession()
}
