import { z } from 'zod'

export const ProjectValidattionSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  deadline: z.date({
    required_error: 'A date of deadline is required.',
  }),
})

export type ProjectCredentials = z.infer<typeof ProjectValidattionSchema>
