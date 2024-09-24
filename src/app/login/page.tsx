'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

const Login = () => {
  const [obj, setObj] = useState({
    email: '',
    password: '',
  })

  const handleChange = (field: string, value: string) => {
    setObj({ ...obj, [field]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='container max-w-lg mx-auto mt-48 text-center'>
      <form action='' className='space-y-4' onSubmit={(e) => handleSubmit(e)}>
        <h2 className='text-4xl font-medium'>Login</h2>
        <div className='text-left space-y-3 text-xl'>
          <label htmlFor='' className=''>
            Email
          </label>
          <Input
            className='text-xl'
            type='email'
            value={obj.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div className='text-left space-y-3 text-xl'>
          <label htmlFor='' className=''>
            Password
          </label>
          <Input
            className='text-xl'
            type='password'
            value={obj.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
        </div>
        <Button
          type='submit'
          onClick={(e) => handleSubmit(e)}
          className='text-xl'
        >
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
