'use client'

import React, { FormEvent, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  CalendarIcon,
  CirclePlus,
  Edit,
  MoreHorizontal,
  Trash,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { addTodo } from '../_actions/todos'
import { useFormState, useFormStatus } from 'react-dom'

const Todos = () => {
  const [obj, setObj] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    startDate: new Date(),
    expectedFinishDate: new Date(),
  })

  const [errors, action] = useFormState(addTodo, {})

  const priority = [
    { value: 'LOW', display: 'Low' },
    { value: 'MEDIUM', display: 'Medium' },
    { value: 'HIGH', display: 'High' },
  ]

  const status = [
    { value: 'NOT_STARTED', display: 'To Do' },
    { value: 'PENDING', display: 'In Progress' },
    { value: 'COMPLETED', display: 'Completed' },
  ]

  const handleChange = (field: string, value: string) => {
    setObj({ ...obj, [field]: value })
  }

  const ActionMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Edit className='mr-2 h-4 w-4' />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className='mr-2 h-4 w-4' />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const renderSubmitButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button type='submit' disabled={pending}>
        Submit
      </Button>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      <div className='flex flex-row justify-between max-w-xs items-start'>
        <h4 className='text-2xl font-medium'>To Do</h4>
        <div className='flex flex-row items-center gap-3'>
          <CirclePlus />
          <div className=''>{ActionMenu()}</div>
        </div>
      </div>
      <div className='flex flex-row justify-between max-w-xs items-start'>
        <h4 className='text-2xl font-medium'>Doing</h4>
        <div className='flex flex-row items-center gap-3'>
          <CirclePlus />
          <div className=''>{ActionMenu()}</div>
        </div>
      </div>
      <div className='flex flex-row justify-between items-start max-w-xs'>
        <h4 className='text-2xl font-medium'>Done</h4>
        <div className='flex flex-row items-center gap-3'>
          <CirclePlus />
          <div className=''>{ActionMenu()}</div>
        </div>
      </div>
      <div className=''>
        <div className='flex flex-row justify-between max-w-xs'>
          <h4 className='text-2xl font-medium'>Add To Do</h4>
          <div className='flex flex-row items-center gap-3'>
            <CirclePlus />
            <div className=''>{ActionMenu()}</div>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className='w-full bg-slate-200 py-10 rounded-md m-4 border-2 border-dashed border-gray-300 cursor-pointer'>
              <div className='flex flex-row items-center gap-3 text-gray-500 w-fit mx-auto'>
                <CirclePlus />
                <h2 className='text-lg font-mediums'>Add</h2>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-xl'>
            <DialogHeader>
              <DialogTitle>Add To-Do</DialogTitle>
              <DialogDescription>Add your to-do!!!</DialogDescription>
            </DialogHeader>
            <div className=''>
              <form action={action} className='space-y-3'>
                <div className='flex flex-col items-start gap-2'>
                  <label htmlFor='title'>Title*</label>
                  <input
                    id='title'
                    name='title'
                    className='border border-gray px-3 py-2 text-base rounded-md'
                    value={obj.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                  {errors?.title && (
                    <div className='text-destructive'>{errors.title}</div>
                  )}
                </div>
                <div className='flex flex-col items-start gap-2'>
                  <label htmlFor='description'>Description</label>
                  <Textarea
                    name='description'
                    value={obj.description}
                    onChange={(e) =>
                      handleChange('description', e.target.value)
                    }
                    className='text-base'
                  />
                  {errors?.description && (
                    <div className='text-destructive'>{errors.description}</div>
                  )}
                </div>
                <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
                  <div className='flex flex-col items-start gap-2'>
                    <label htmlFor='status'>Status</label>
                    <Select
                      value={obj.status}
                      onValueChange={(val) => handleChange('status', val)}
                    >
                      <SelectTrigger className='w-[250px]'>
                        <SelectValue placeholder='Select the status' />
                      </SelectTrigger>
                      <SelectContent>
                        {status.map((stat, index) => (
                          <SelectItem key={index} value={stat.value}>
                            {stat.display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type='hidden' name='status' value={obj.status} />
                    {errors?.status && (
                      <div className='text-destructive'>{errors.status}</div>
                    )}
                  </div>
                  <div className='flex flex-col items-start gap-2'>
                    <label htmlFor='priority'>Priority</label>
                    <Select
                      value={obj.priority}
                      onValueChange={(val) => handleChange('priority', val)}
                    >
                      <SelectTrigger className='w-[250px]'>
                        <SelectValue placeholder='Select the priority' />
                      </SelectTrigger>
                      <SelectContent>
                        {priority.map((stat, index) => (
                          <SelectItem key={index} value={stat.value}>
                            {stat.display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type='hidden' name='priority' value={obj.priority} />
                    {errors?.priority && (
                      <div className='text-destructive'>{errors.priority}</div>
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
                  <div className='flex flex-col items-start gap-2'>
                    <label htmlFor='startDate'>Start Date</label>
                    <input
                      type='hidden'
                      name='startDate'
                      value={obj.startDate ? obj.startDate : ''}
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[250px] flex flex-row items-center justify-between font-normal',
                            !obj.startDate && 'text-muted-foreground'
                          )}
                        >
                          {obj.startDate ? (
                            format(obj.startDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='mr-2 h-4 w-4' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={obj.startDate}
                          onSelect={(val) => handleChange('startDate', val)}
                          disabled={(date) =>
                            date < new Date(obj.startDate) || date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors?.startDate && (
                      <div className='text-destructive'>{errors.startDate}</div>
                    )}
                  </div>
                  <div className='flex flex-col items-start gap-2'>
                    <label htmlFor='expectedFinishDate'>Due Date</label>
                    <input
                      type='hidden'
                      name='expectedFinishDate'
                      value={
                        obj.expectedFinishDate ? obj.expectedFinishDate : ''
                      }
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[250px] flex flex-row items-center justify-between font-normal',
                            !obj.expectedFinishDate && 'text-muted-foreground'
                          )}
                        >
                          {obj.expectedFinishDate ? (
                            format(obj.expectedFinishDate, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='mr-2 h-4 w-4' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={obj.expectedFinishDate}
                          onSelect={(val) =>
                            handleChange('expectedFinishDate', val)
                          }
                          disabled={(date) => date < new Date(obj.startDate)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors?.expectedFinishDate && (
                      <div className='text-destructive'>
                        {errors.expectedFinishDate}
                      </div>
                    )}
                  </div>
                </div>
                <div>{renderSubmitButton()}</div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Todos
