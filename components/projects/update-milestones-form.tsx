'use client'

import { Milestone } from '@/app/data/schema'
import {
  MilestonesCredentials,
  MilestonesValidationSchema,
} from '@/lib/validators/update-milestones-validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import { Checkbox } from '../ui/checkbox'

interface editMilestonesFormProps {
  milestones: Milestone[]
}

export function UpdateMilestonesForm({ milestones }: editMilestonesFormProps) {
  const defaultValues: Partial<MilestonesCredentials> = {
    milestones: milestones.map((milestone) => ({
      title: milestone.title || '',
      deadline: milestone.deadline ? new Date(milestone.deadline) : new Date(),
      checked: milestone.checked,
      completed: milestone.completed
        ? new Date(milestone.completed)
        : undefined,
    })),
  }

  const form = useForm<MilestonesCredentials>({
    resolver: zodResolver(MilestonesValidationSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    name: 'milestones',
    control: form.control,
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: MilestonesCredentials) => {
    setIsLoading(true)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
        <div className="space-y-2">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`milestones.${index}.title`}
              render={({ field }) => (
                <div className="flex gap-6">
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Milestone ${index + 1}`}
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[180px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {form.watch(`milestones.${index}.deadline`) ? (
                              format(
                                form.watch(`milestones.${index}.deadline`) ||
                                  new Date(),
                                'PPP'
                              )
                            ) : (
                              <span>Select deadline</span> // Correctly displayed for an undefined deadline
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date)
                            } else {
                              field.onChange(new Date())
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                  <FormItem className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[180px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {form.watch(`milestones.${index}.completed`) ? (
                              format(
                                form.watch(`milestones.${index}.completed`) ||
                                  new Date(),
                                'PPP'
                              )
                            ) : (
                              <span>Completed date</span> // Correctly displayed for an undefined deadline
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date)
                            } else {
                              field.onChange(new Date())
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                  <FormItem className="flex-1">
                    <FormControl>
                      <Checkbox
                        {...form.register(`milestones.${index}.checked`)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                    className="p-2" // Adjust padding as needed
                  >
                    <Icons.trash className="w-4 h-4 text-rose-500" />
                  </Button>
                </div>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() =>
              append({
                title: '',
                deadline: new Date(),
                completed: undefined,
                checked: false,
              })
            }
          >
            Add Milestone
          </Button>
        </div>
        <div className="w-[440px] flex justify-end">
          <Button type="submit" className="flex">
            <Icons.loader
              className={cn('animate-spin mr-2 w-4 h-4', {
                hidden: !isLoading,
              })}
            />
            Add Project
          </Button>
        </div>
      </form>
    </Form>
  )
}
