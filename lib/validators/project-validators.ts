import { z } from 'zod'

export const ProjectValidationSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(30, {
      message: 'Title must not be longer than 30 characters.',
    }),
  start_date: z.date({
    required_error: 'A stat date is required.',
  }),
  deadline: z.date({
    required_error: 'A deadline is required.',
  }),
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

export type ProjectCredentials = z.infer<typeof ProjectValidationSchema>
