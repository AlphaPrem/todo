'use server'

import { z } from 'zod'
import prisma from '../db/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const verify = z.object({
  email: z.string().email(),
})
