import { z } from 'zod'

export const MilestonesValidationSchema = z.object({
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

export type MilestonesCredentials = z.infer<typeof MilestonesValidationSchema>
