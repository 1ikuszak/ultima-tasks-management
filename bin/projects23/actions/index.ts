'use server'

import { Milestone, Project } from '@/app/data/schema'
import createSupabaseClient from '@/lib/supabase/server'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

export async function createProject(
  name: string,
  notes: string,
  start_date: Date,
  end_date: Date,
  color: string
) {
  const supabase = await createSupabaseClient()
  const result = await supabase
    .from('projects')
    .insert({ name, notes, start_date, end_date, color })
    .select()
    .single()
  revalidatePath('/projects')
  return JSON.stringify(result)
}

export async function createProjectMilestonesBulk(milestones: Milestone[]) {
  const supabase = await createSupabaseClient()
  const result = await supabase.from('milestones').insert(milestones)

  revalidatePath('/projects')
  return JSON.stringify(result)
}

export async function readProjects() {
  noStore()
  const supabase = await createSupabaseClient()
  return await supabase.from('projects').select('*').order('created_at')
}

export async function readProjectMilestones(project_id: string) {
  noStore()
  const supabase = await createSupabaseClient()
  return await supabase
    .from('milestones')
    .select('*')
    .eq('project_id', project_id)
}

export async function readProjectsAndMilestones() {
  noStore()
  const supabase = await createSupabaseClient()

  const [projectsResponse, milestonesResponse] = await Promise.all([
    supabase.from('projects').select('*'),
    supabase.from('milestones').select('*').order('index'),
  ])

  if (projectsResponse.error) {
    console.error(projectsResponse.error)
    return []
  }

  if (milestonesResponse.error) {
    console.error(milestonesResponse.error)
    return []
  }

  const combinedData = projectsResponse.data.map((project) => ({
    ...project,
    milestones: milestonesResponse.data.filter(
      (milestone) => milestone.project_id === project.id
    ),
  }))

  return combinedData
}

export async function readProjectWithMilestonesById(project_id: string) {
  const supabase = await createSupabaseClient()

  const [projectsResponse, milestonesResponse] = await Promise.all([
    supabase
      .from('projects')
      .select('id, name, notes, color, start_date, end_date')
      .eq('id', project_id)
      .single(),
    supabase
      .from('milestones')
      .select('id, name, deadline, index, checked, project_id')
      .eq('project_id', project_id)
      .order('index'),
  ])

  if (projectsResponse.error || milestonesResponse.error) {
    throw new Error('Error fetching project or milestones')
  }

  return {
    project: projectsResponse.data,
    milestones: milestonesResponse.data,
  }
}

export async function UpdateProject(project: Project) {
  const supabase = await createSupabaseClient()
  const result = await supabase
    .from('projects')
    .update(project)
    .eq('id', project.id)

  revalidatePath('/projects')
  return JSON.stringify({ result })
}

export async function UpdateMilestones(milestones: Milestone[]) {
  const supabase = await createSupabaseClient()
  const result = await supabase
    .from('milestones')
    .upsert(milestones)
    .eq('project_id', milestones[0].project_id)

  revalidatePath('/projects')
  return JSON.stringify({ result })
}

export async function deleteMilestones(milestoneIds: number[]) {
  const supabase = await createSupabaseClient()
  const result = await supabase
    .from('milestones')
    .delete()
    .in('id', milestoneIds)

  revalidatePath('/projects')
  return JSON.stringify({ result })
}

export async function deleteProjectById(id: string) {
  const supabase = await createSupabaseClient()

  try {
    // Execute both delete operations concurrently
    const [tasksResult, projectsResult] = await Promise.all([
      supabase.from('tasks').delete().eq('project_id', id),
      supabase.from('projects').delete().eq('id', id),
    ])

    // Revalidate the path
    revalidatePath('/projects')

    // Combine the results into one object and return as a JSON string
    return JSON.stringify({ tasksResult, projectsResult })
  } catch (error) {
    // Handle any errors that occur during the delete operations
    console.error('Error deleting project data:', error)
    throw error // rethrow the error if you want to handle it further up the call stack
  }
}
