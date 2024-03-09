import { Milestone } from 'lucide-react'
import { z } from 'zod'

export const milestoneSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  deadline: z.union([z.string(), z.date()]),
  completed: z.union([z.string(), z.date()]).optional().nullable(),
  checked: z.boolean(),
  project_id: z.string(),
})
export type Milestone = z.infer<typeof milestoneSchema>

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  start_date: z.union([z.string(), z.date()]),
  deadline: z.union([z.string(), z.date()]),
  notes: z.string().optional().nullable(),
})

export type Project = z.infer<typeof projectSchema>

export const projectWithMilestonesSchema = projectSchema.extend({
  milestones: z.array(milestoneSchema),
})

export type ProjectWithMilestones = z.infer<typeof projectWithMilestonesSchema>

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
