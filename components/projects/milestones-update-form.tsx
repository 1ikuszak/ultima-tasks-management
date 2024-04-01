'use client'

import { v4 as uuidv4 } from 'uuid'
import { Milestone, Milestones, MilestonesSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Checkbox } from '../ui/checkbox'
import {
  deleteMilestonesInBulk,
  updateMilestonesInBulk,
} from '@/app/projects/actions'

interface editMilestonesFormProps {
  milestones: Milestone[]
  project_id: string
}

export function MilestonesUpdateForm({
  milestones,
  project_id,
}: editMilestonesFormProps) {
  const defaultValues: Partial<Milestones> = {
    milestones: milestones.map((milestone) => ({
      title: milestone.title || '',
      deadline: milestone.deadline ? new Date(milestone.deadline) : new Date(),
      checked: milestone.checked,
      completed: milestone.completed
        ? new Date(milestone.completed)
        : undefined,
    })),
  }

  const form = useForm<Milestones>({
    resolver: zodResolver(MilestonesSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    name: 'milestones',
    control: form.control,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async (index: number) => {
    remove(index)
    const deleteResult = await deleteMilestonesInBulk(milestones[index].id!)
    if (deleteResult.error) {
      toast.error(deleteResult.error.message)
      return
    } else {
      toast('milestones successfully deleted')
    }
  }

  const onSubmit = async (data: Milestones) => {
    setIsLoading(true)
    if (data.milestones) {
      const fullMilestones = data.milestones.map((milestone, index) => {
        if (milestones[index] && milestones[index].id) {
          return {
            ...milestone,
            id: milestones[index].id,
            project_id: milestones[index].project_id,
          }
        } else {
          return {
            ...milestone,
            id: uuidv4(), // Generate new UUID
            project_id: project_id,
          }
        }
      })
      const updateResult = await updateMilestonesInBulk(fullMilestones)
      if (updateResult.error) {
        toast.error(updateResult.error.message)
        return
      } else toast('milestones successfully updated')
    }
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div className="flex gap-10 justify-between" key={field.id}>
              <FormField
                control={form.control}
                name={`milestones.${index}.title`}
                render={({ field }) => (
                  <FormItem className="flex-1 w-[300px]">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Milestone ${index + 1}`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-4 items-center">
                <FormField
                  control={form.control}
                  name={`milestones.${index}.deadline`}
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name={`milestones.${index}.completed`}
                  render={({ field }) => (
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
                  )}
                />
                <FormField
                  control={form.control}
                  name={`milestones.${index}.checked`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleDelete(index)}
                >
                  <Icons.trash className="w-4 h-4 text-rose-500" />
                </Button>
              </div>
            </div>
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
        <div className="w-full flex justify-end">
          <Button type="submit" className="flex">
            <Icons.loader
              className={cn('animate-spin mr-2 w-4 h-4', {
                hidden: !isLoading,
              })}
            />
            Update Milestones
          </Button>
        </div>
      </form>
    </Form>
  )
}
