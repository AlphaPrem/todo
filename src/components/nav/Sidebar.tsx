'use client'

import React from 'react'
import {
  VercelLogoIcon,
  DashboardIcon,
  Component2Icon,
} from '@radix-ui/react-icons'
import { useMediaQuery } from 'react-responsive'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const link = [
  { icon: DashboardIcon, title: 'Dashboard', href: 'dashboard' },
  { icon: Component2Icon, title: 'Todos', href: 'todos' },
]

const Sidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const pathname = usePathname()
  const pathEnd = pathname.split('/').pop()

  if (pathEnd === 'login' || pathEnd === 'register') {
    return <div>{children}</div>
  }

  return (
    <div className='flex flex-row gap-3 items-start'>
      <div className='sidebar h-screen bg-slate-100  w-1/6 flex flex-col items-start px-3 py-20'>
        <div className='header'>
          <div className='flex flex-row items-center gap-5 p-3 text-black'>
            <VercelLogoIcon className='w-5 h-5' />
            <h2 className='text-2xl font-semibold'>Logo</h2>
          </div>
        </div>
        <div className='space-y-2 w-full'>
          {link.map((item, index) => (
            <Link
              className={cn(
                pathEnd === item.href ? 'bg-slate-300' : '',
                'flex flex-row items-center gap-5 p-3 w-full rounded-md'
              )}
              key={index}
              href={item.href}
            >
              <item.icon className={`w-5 h-5 text-black`} />
              <h3 className={`text-sm text-black`}>{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex-grow'>{children}</div>
    </div>
  )
}

export default Sidebar
