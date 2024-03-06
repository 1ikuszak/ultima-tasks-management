import { z } from 'zod'

export const SignUpValidationSchema = z
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

export type SignUpCredentials = z.infer<typeof SignUpValidationSchema>
