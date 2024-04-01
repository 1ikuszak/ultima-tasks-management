import * as z from 'zod'

export const MilestoneSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  deadline: z.union([z.string(), z.date()]),
  completed: z.union([z.string(), z.date()]).optional().nullable(),
  checked: z.boolean(),
  project_id: z.string(),
})
export type Milestone = z.infer<typeof MilestoneSchema>

export const ProjectSchema = z.object({
  id: z.string().optional().nullable(),
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(30, {
      message: 'Title must not be longer than 30 characters.',
    }),
  start_date: z.union([z.date(), z.string()]).optional(),
  deadline: z.union([z.date(), z.string()]).optional(),
  milestones: z
    .array(
      z.object({
        title: z.string(),
        deadline: z.date(),
      })
    )
    .optional(),
  notes: z.string().optional(),
})
export type Project = z.infer<typeof ProjectSchema>

export const ProjectWithMilestonesSchema = ProjectSchema.extend({
  milestones: z.array(MilestoneSchema),
})
export type ProjectWithMilestones = z.infer<typeof ProjectWithMilestonesSchema>

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  notes: z.string(),
  deadline: z.union([z.string(), z.date()]),
  blocked: z.boolean(),
  project_id: z.string(),
  status: z.string().optional(),
})
export type Task = z.infer<typeof TaskSchema>

export const CreationTaskSchema = z.object({
  title: z.string(),
  notes: z.string(),
  deadline: z.union([z.string(), z.date()]),
  blocked: z.boolean(),
  project_id: z.string(),
  status: z.string().optional(),
})
export type CreationTask = z.infer<typeof CreationTaskSchema>

export const MilestonesSchema = z.object({
  milestones: z
    .array(
      z.object({
        title: z.string(),
        deadline: z.date(),
        checked: z.boolean(),
        completed: z.date().optional(),
      })
    )
    .optional(),
})
export type Milestones = z.infer<typeof MilestonesSchema>

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: 'password must be at least 6 characters',
    }),
    confirmPassword: z.string().min(6, {
      message: 'password must be at least 6 characters',
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Password did not match',
    path: ['confirmPassword'],
  })

export type Register = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'password must be at least 6 characters',
  }),
})
export type Login = z.infer<typeof LoginSchema>
