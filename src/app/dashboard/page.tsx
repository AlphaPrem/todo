'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { userStore } from '@/store/userStore'

import { redirect } from 'next/navigation'

const Dashboard = () => {
  const { user, isAuthenticated } = userStore()

  useEffect(() => {
    if (!user) {
      redirect('/login')
    }
  }, [user])

  console.log(user)

  return (
    <div>
      <h2 className='text-2xl font-medium my-2'>Statistics</h2>
      <div className='flex flex-col gap-3 md:flex-row w-full'>
        <Card className='max-w-sm w-full bg-gradient-to-r from-cyan-500 to-blue-500'>
          <CardHeader>
            <CardTitle className='text-3xl'>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='font-medium text-5xl'>{0}</h1>
          </CardContent>
        </Card>
        <Card className='max-w-sm w-full bg-gradient-to-r from-teal-400 to-yellow-200'>
          <CardHeader>
            <CardTitle className='text-3xl'>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='font-medium text-5xl'>{0}</h1>
          </CardContent>
        </Card>
        <Card className='max-w-sm w-full bg-gradient-to-r from-amber-500 to-pink-500'>
          <CardHeader>
            <CardTitle className='text-3xl'>On-Going Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className='font-medium text-5xl'>{0}</h1>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
