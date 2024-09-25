'use server'

import prisma from '../db/db'
import { z } from 'zod'

const loginVerify = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const registerVerify = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
})

export const registerUser = async (prevState: any, formData: FormData) => {
  try {
    const result = registerVerify.safeParse(
      Object.fromEntries(formData.entries())
    )

    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }

    const data = result.data

    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    })

    return {
      newUser: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      success: true,
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const loginUser = async (prevState: any, formData: FormData) => {
  try {
    const result = loginVerify.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }

    const data = result.data

    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    // 2. Check if user exists
    if (!user) {
      return { error: 'User not found!' }
    }

    if (data.password !== user.password) {
      throw new Error('Invalid password!')
    }

    // 5. Return success response
    return { user: user, success: true }
  } catch (error: any) {
    // Handle errors
    return { error: error.message }
  }
}
