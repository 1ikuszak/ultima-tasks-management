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
  console.log(milestones)
  const supabase = await supabaseServer()
  const result = await supabase.from('milestone').insert(milestones)
  revalidatePath(`projects`)
  return result
}

export async function getProjectWithMilestones() {
  const supabase = await supabaseServer()
  const result = await supabase
    .from('project') // Assuming 'projects' is your projects table name
    .select(
      `
        *,
        milestones: milestone!project_id (title, deadline, completed, checked, project_id)
    `
    )
    .order('deadline', { referencedTable: 'milestone' }) // Order milestones by deadline
    .order('created_at', { ascending: true }) // Additionally, order projects by their ID or another relevant field
  revalidatePath(`projects`)
  return result
}
