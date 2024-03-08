import { Milestone } from 'lucide-react'
import { z } from 'zod'

export const milestoneSchema = z.object({
  // id: z.number().optional(),
  title: z.string(),
  deadline: z.date().optional(),
  checked: z.boolean(),
  project_id: z.string(),
})
export type Milestone = z.infer<typeof milestoneSchema>

export const projectSchema = z.object({
  // id: z.string(),
  title: z.string(),
  start_date: z.date().optional(),
  deadline: z.date().optional(),
  notes: z.string().optional(),
})

export type Project = z.infer<typeof projectSchema>

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  project_member: z.string(),
  notes: z.string(),
  deadline: z.union([z.string(), z.date()]),
  blocked: z.boolean(),
  project_id: z.string(),
  status: z.string().optional(),
  priority: z.string().optional(),
  blocking_task: z.string().optional().nullable(),
  index: z.number().optional().nullable(),
})

export type Task = z.infer<typeof taskSchema>

export const creationTaskSchema = z.object({
  title: z.string(),
  project_member: z.string(),
  notes: z.string(),
  deadline: z.union([z.string(), z.date()]),
  blocked: z.boolean(),
  project_id: z.string(),
  status: z.string().optional(),
  priority: z.string().optional(),
  blocking_task: z.string().optional().nullable(),
  index: z.number().optional().nullable(),
})

export type CreationTask = z.infer<typeof creationTaskSchema>
