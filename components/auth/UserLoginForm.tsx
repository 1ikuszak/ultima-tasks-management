'use client'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { signInWithEmailAndPassword } from '../../app/auth/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Icons } from '../icons'
import {
  SignInValidationSchema,
  SignInCredentials,
} from '@/lib/validators/signin-validator'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>({
    resolver: zodResolver(SignInValidationSchema),
  })

  function onSubmit(data: SignInCredentials) {
    setIsLoading(async () => {
      const result = await signInWithEmailAndPassword(data)
      const { error } = JSON.parse(result)

      if (error?.message) {
        toast.error(error.message)
      } else {
        toast.success('successfuly Login')
      }
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              className={cn({ 'focus-visible:ring-red-500': errors.email })}
              id="email"
              placeholder="you@example.com"
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register('password')}
              className={cn({ 'focus-visible:ring-red-500': errors.password })}
              id="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.loader className="w-4 h-4 mr-2 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}
