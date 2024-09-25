'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { loginUser } from '../_actions/user'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { userStore } from '@/store/userStore'
import { redirect } from 'next/navigation'

const Login = () => {
  const [obj, setObj] = useState({
    email: '',
    password: '',
  })

  const { user, isAuthenticated, setUser } = userStore()

  const [errors, action] = useFormState(loginUser, null)

  useEffect(() => {
    if (errors !== null && errors.success) {
      setUser(errors.user)
      redirect('/dashboard')
    }
  }, [errors])

  const handleChange = (field: string, value: string) => {
    setObj({ ...obj, [field]: value })
  }

  return (
    <div className='container max-w-lg mx-auto mt-48 text-center'>
      <form action={action} className='space-y-4'>
        <h2 className='text-4xl font-medium'>Login</h2>
        {errors?.error && (
          <Alert variant='destructive'>
            <ExclamationTriangleIcon className='h-4 w-4' />
            <AlertTitle>{errors.error}</AlertTitle>
          </Alert>
        )}
        <div className='text-left space-y-3 text-xl'>
          <label htmlFor='email' className=''>
            Email
          </label>
          <Input
            name='email'
            className='text-xl'
            type='email'
            value={obj.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors?.email && <p className='text-destructive'>{errors.email}</p>}
        </div>
        <div className='text-left space-y-3 text-xl'>
          <label htmlFor='password' className=''>
            Password
          </label>
          <Input
            className='text-xl'
            type='password'
            value={obj.password}
            onChange={(e) => handleChange('password', e.target.value)}
            name='password'
          />
          {errors?.password && (
            <p className='text-destructive'>{errors.password}</p>
          )}
        </div>
        <Button type='submit' className='text-xl'>
          Submit
        </Button>
      </form>
      <p className='my-3'>
        Dont&apos;t have an Account?{' '}
        <span className='text-blue-600'>
          <Link href='register'>Sign up</Link>
        </span>
      </p>
    </div>
  )
}

export default Login
