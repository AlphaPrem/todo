'use server'

import { z } from 'zod'
import prisma from '../db/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const verify = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'] as const),
  status: z.enum(['PENDING', 'COMPLETED', 'NOT_STARTED']),
  startDate: z.coerce.date(),
  expectedFinishDate: z.coerce.date(),
  userId: z.string(),
})

export async function addTodo(prevState: unknown, formData: FormData) {
  try {
    const result = verify.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }

    const data = result.data

    const newTodo = await prisma.todos.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        userId: data.userId,
        startDate: data.startDate,
        expectedFinishDate: data.expectedFinishDate,
      },
    })

    return { newTodo: newTodo, success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function fetchUserTodosAction(userId: string) {
  const todos = await prisma.todos.findMany({
    where: { userId: userId },
  })

  return todos
}
