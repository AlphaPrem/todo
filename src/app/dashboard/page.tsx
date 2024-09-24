import React from 'react'
import prisma from '../db/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function getAllTodos() {
  const todos = await prisma.todos.count()

  console.log(todos)
  return todos
}

const Dashboard = async () => {
  const [allTodos] = await Promise.all([getAllTodos()])

  return (
    <div>
      <h2 className='text-2xl font-medium my-2'>Statistics</h2>
      <div className='flex flex-col gap-3 md:flex-row w-full'>
        <Card className='max-w-sm w-full bg-gradient-to-r from-cyan-500 to-blue-500'>
          <CardHeader>
            <CardTitle className='text-3xl'>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='font-medium text-5xl'>{allTodos}</h1>
          </CardContent>
        </Card>
        <Card className='max-w-sm w-full bg-gradient-to-r from-teal-400 to-yellow-200'>
          <CardHeader>
            <CardTitle className='text-3xl'>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='font-medium text-5xl'>{allTodos}</h1>
          </CardContent>
        </Card>
        <Card className='max-w-sm w-full bg-gradient-to-r from-amber-500 to-pink-500'>
          <CardHeader>
            <CardTitle className='text-3xl'>On-Going Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='font-medium text-5xl'>{allTodos}</h1>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
