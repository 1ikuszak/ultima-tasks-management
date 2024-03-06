'use server'

import supabaseServer from '@/lib/supabase/server'

export async function signUpWithEmailAndPassword(data: {
  email: string
  password: string
  confirmPassword: string
}) {
  const supabase = await supabaseServer()
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  return JSON.stringify(result)
}

export async function signInWithEmailAndPassword(data: {
  email: string
  password: string
}) {
  const supabase = await supabaseServer()
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  return JSON.stringify(result)
}
