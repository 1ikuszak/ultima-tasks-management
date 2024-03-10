'use client'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProjectCredentials,
  ProjectValidationSchema,
} from '@/lib/validators/project-validators'
import {
  Form,
  FormControl,
  FormDescription,
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
import { createMilestonesInBulk, createProject } from '@/app/projects/actions'
import { toast } from 'sonner'

const defaultValues: Partial<ProjectCredentials> = {
  title: '',
  deadline: undefined,
  start_date: undefined,
  milestones: [{ title: 'milestone 1', deadline: new Date() }],
  notes: '',
}

export function AddProjectForm() {
  const form = useForm<ProjectCredentials>({
    resolver: zodResolver(ProjectValidationSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    name: 'milestones',
    control: form.control,
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: ProjectCredentials) => {
    setIsLoading(true)

    // add project
    const projectResponse = await createProject({
      title: data.title,
      start_date: data.start_date,
      deadline: data.deadline,
      notes: data.notes,
    })

    // get project_id
    const projectResult = JSON.parse(projectResponse)
    if (projectResult.error) {
      toast.error('Error creating project')
      return
    }
    if (projectResult.data && data.milestones) {
      // add milestones
      const project_id = projectResult.data.id
      const fullMilestones = data.milestones.map((milestone) => ({
        ...milestone,
        checked: false,
        project_id: project_id,
      }))
      const milestoneResult = await createMilestonesInBulk(fullMilestones)
      if (milestoneResult.error) {
        toast.error('Error adding milestones')
        return
      } else toast('Project successfully added')
    }
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[64px]">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              General information
            </h3>
            <Separator />
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project title</FormLabel>
                <FormControl>
                  <Input
                    className="w-[440px]"
                    placeholder="Your new project name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[206px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>starting Date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date || new Date())
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[206px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>deadline date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              Project Milestones
            </h3>
            <Separator />
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div className="flex gap-2">
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`milestones.${index}.title`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={`Milestone ${index + 1}`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`milestones.${index}.deadline`}
                  render={({ field }) => (
                    <div className="flex gap-6">
                      <FormItem className="flex-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[206px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {form.watch(`milestones.${index}.deadline`) ? (
                                  format(
                                    form.watch(
                                      `milestones.${index}.deadline`
                                    ) || new Date(),
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
                    </div>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="p-2" // Adjust padding as needed
                >
                  <Icons.trash className="w-4 h-4 text-rose-500" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ title: '', deadline: new Date() })} // Ensures the deadline is initially undefined
            >
              Add Milestone
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              Notes
            </h3>
            <Separator />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="note some important information"
                      className="resize-none w-[440px] h-[10rem]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
