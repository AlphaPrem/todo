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
})

export async function addTodo(prevState: unknown, formData: FormData) {
  const result = verify.safeParse(Object.fromEntries(formData.entries()))

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await prisma.todos.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      startDate: data.startDate,
      expectedFinishDate: data.expectedFinishDate,
    },
  })

  revalidatePath('/')
  revalidatePath('/todos')

  redirect('/todos')
}
