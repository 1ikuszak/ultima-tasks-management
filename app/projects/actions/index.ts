'use server'

import { Project } from '@/app/data/schema'
import supabaseServer from '@/lib/supabase/server'
import { Milestone } from '@/app/data/schema'
import { revalidatePath } from 'next/cache'

export async function createProject(task: Project) {
  const supabase = await supabaseServer()
  const result = await supabase.from('project').insert(task).select().single()
  revalidatePath(`projects`)
  return JSON.stringify(result)
}

export async function createMilestonesInBulk(milestones: Milestone[]) {
  const supabase = await supabaseServer()
  const result = await supabase.from('milestone').insert(milestones)
  revalidatePath(`projects`)
  return JSON.stringify(result)
}
