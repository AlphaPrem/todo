import React from 'react'
import { TodoInterface } from '../../app/_components/interfaces'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TodoItemProps {
  todo: TodoInterface
}

const TodoCard = ({ todo }: TodoItemProps) => {
  const renderPriorityTag = (priorty: string) => {
    switch (priorty) {
      case 'LOW':
        return (
          <div className='bg-cyan-300 text-black px-2 py-1 text-xs rounded-sm'>
            Low
          </div>
        )

      case 'MEDIUM':
        return (
          <div className='bg-orange-400 text-black px-2 py-1 text-xs rounded-sm'>
            Medium
          </div>
        )

      case 'HIGH':
        return (
          <div className='bg-red-500 text-white px-2 py-1 text-xs rounded-sm'>
            High
          </div>
        )

      default:
        return <div>Default render</div>
    }
  }

  function timeRemaining(targetDate: Date): string {
    const now = new Date()

    // Calculate the difference in milliseconds
    let diff = targetDate.getTime() - now.getTime()

    // If the targetDate is in the past, return '0m'
    if (diff <= 0) return '0m'

    // Time constants
    const yearInMs = 1000 * 60 * 60 * 24 * 365
    const monthInMs = 1000 * 60 * 60 * 24 * 30
    const weekInMs = 1000 * 60 * 60 * 24 * 7
    const dayInMs = 1000 * 60 * 60 * 24
    const hourInMs = 1000 * 60 * 60
    const minuteInMs = 1000 * 60

    // Calculate years, months, weeks, days, hours, and minutes
    const years = Math.floor(diff / yearInMs)
    diff -= years * yearInMs

    const months = Math.floor(diff / monthInMs)
    diff -= months * monthInMs

    const weeks = Math.floor(diff / weekInMs)
    diff -= weeks * weekInMs

    const days = Math.floor(diff / dayInMs)
    diff -= days * dayInMs

    const hours = Math.floor(diff / hourInMs)
    diff -= hours * hourInMs

    const minutes = Math.floor(diff / minuteInMs)

    // Handle formatting based on time remaining
    if (years > 0 || months > 0 || weeks > 0 || days > 0) {
      let result = ''
      if (years > 0) result += `${years}y `
      if (months > 0) result += `${months}m `
      if (weeks > 0) result += `${weeks}w `
      if (days > 0) result += `${days}d `
      return result.trim()
    }

    // If time is under 1 day, display hours and minutes
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }

    // If time is under 1 hour, display only minutes
    return `${minutes}m`
  }

  const isDue =
    todo.expectedFinishDate.getTime() - new Date().getTime() <= 0 ? true : false

  return (
    <Card
      className={cn(
        isDue && 'border-rose-200',
        'hover:scale-105 cursor-pointer'
      )}
    >
      <CardHeader>
        <CardTitle>{todo.title}</CardTitle>
        <div className='flex flex-row flex-wrap gap-1'>
          {renderPriorityTag(todo.priority)}
          {isDue && (
            <div className='bg-rose-400 text-black px-2 py-1 text-xs rounded-sm'>
              Due
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{todo.description}</CardDescription>
      </CardContent>
      <CardFooter>{timeRemaining(todo.expectedFinishDate)}</CardFooter>
    </Card>
  )
}

export default TodoCard
