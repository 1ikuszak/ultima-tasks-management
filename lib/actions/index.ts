'use server'

import supabaseServer from '../supabase/server'
import { unstable_noStore as noStore } from 'next/cache'

export default async function readUserSession() {
  noStore()
  const supabase = await supabaseServer()
  return supabase.auth.getSession()
}
