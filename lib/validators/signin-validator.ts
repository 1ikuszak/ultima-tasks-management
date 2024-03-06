import { z } from 'zod'

export const SignInValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'password must be at least 6 characters',
  }),
})

export type SignInCredentials = z.infer<typeof SignInValidationSchema>
