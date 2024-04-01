'use server'

import { Milestone, Project } from '@/schemas'
import supabaseServer from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProject(project: Project) {
  const supabase = await supabaseServer()
  const result = await supabase
    .from('project')
    .insert(project)
    .select()
    .single()
  revalidatePath(`projects`)
  return JSON.stringify(result)
}

export async function createMilestonesInBulk(milestones: Milestone[]) {
  const supabase = await supabaseServer()
  const result = await supabase.from('milestone').insert(milestones)
  revalidatePath(`projects`)
  return result
}

export async function getProjectWithMilestones() {
  const supabase = await supabaseServer()
  const result = await supabase
    .from('project')
    .select(
      `
        *,
        milestones: milestone!project_id (id, title, deadline, completed, checked, project_id)
    `
    )
    .order('deadline', { referencedTable: 'milestone' })
    .order('created_at', { ascending: true })
  revalidatePath(`projects`)
  return result
}

export async function deleteMilestonesInBulk(milestone_id: string) {
  const supabase = await supabaseServer()
  const result = await supabase
    .from('milestone')
    .delete()
    .eq('id', milestone_id)

  revalidatePath(`projects`)
  return result
}

export async function updateMilestonesInBulk(milestones: Milestone[]) {
  const supabase = await supabaseServer()
  const result = await supabase
    .from('milestone')
    .upsert(milestones, { onConflict: 'id' })

  revalidatePath(`projects`)
  return result
}
