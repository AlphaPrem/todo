'use client'

import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    redirect('/dashboard')
  }, [])

  return <div>Home</div>
}

export default Home
