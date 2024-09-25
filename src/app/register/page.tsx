'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { registerUser } from '../_actions/user'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { userStore } from '@/store/userStore'
import { redirect } from 'next/navigation'

const Register = () => {
  const [obj, setObj] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [errors, action] = useFormState(registerUser, null)
  const { user, isAuthenticated, setUser } = userStore()

  const handleChange = (field: string, value: string) => {
    setObj({ ...obj, [field]: value })
  }

  console.log(errors)

  useEffect(() => {
    if (errors !== null && errors.success) {
      setUser(errors.newUser)
      redirect('/dashboard')
    }
  }, [errors])

  return (
    <div className='container max-w-lg mx-auto mt-48 text-center'>
      <form action={action} className='space-y-4'>
        <h2 className='text-4xl font-medium'>Register</h2>
        {errors?.error && (
          <Alert variant='destructive'>
            <ExclamationTriangleIcon className='h-4 w-4' />
            <AlertTitle>{errors.error}</AlertTitle>
          </Alert>
        )}
        <div className='flex flex-row items-center justify-between'>
          <div className='text-left space-y-3 text-xl'>
            <label htmlFor='firstName' className=''>
              First Name
            </label>
            <Input
              className='text-xl'
              name='firstName'
              type='string'
              value={obj.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            {errors?.firstName && (
              <p className='text-destructive'>{errors.firstName}</p>
            )}
          </div>
          <div className='text-left space-y-3 text-xl'>
            <label htmlFor='lastName' className=''>
              Last Name
            </label>
            <Input
              className='text-xl'
              name='lastName'
              type='string'
              value={obj.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
            {errors?.lastName && (
              <p className='text-destructive'>{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className='text-left space-y-3 text-xl'>
          <label htmlFor='email' className=''>
            Email
          </label>
          <Input
            className='text-xl'
            name='email'
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
            name='password'
            className='text-xl'
            type='password'
            value={obj.password}
            onChange={(e) => handleChange('password', e.target.value)}
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
          <Link href='login'>Login</Link>
        </span>
      </p>
    </div>
  )
}

export default Register
