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
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { userStore } from '@/store/userStore'

const link = [
  { icon: DashboardIcon, title: 'Dashboard', href: 'dashboard' },
  { icon: Component2Icon, title: 'Todos', href: 'todos' },
]

const categories = [
  // { color: '', value: 'NOT_STARTED', display: 'To Do' },
  // { color: '', value: 'PENDING', display: 'In Progress' },
  // { color: '', value: 'COMPLETED', display: 'Done' },
  { color: 'bg-cyan-300', value: 'LOW', display: 'Low' },
  { color: 'bg-orange-400', value: 'MEDIUM', display: 'Medium' },
  { color: 'bg-red-500', value: 'HIGH', display: 'High' },
]

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 })

  const { user } = userStore()

  const pathname = usePathname()
  const pathEnd = pathname.split('/').pop()

  if (pathEnd === 'login' || pathEnd === 'register') {
    return
  }

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side='left' className='bg-slate-100'>
          <div className='h-full flex flex-col items-start pt-10 justify-between'>
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
                  <h3 className={`text-lg text-black`}>{item.title}</h3>
                </Link>
              ))}
              <h3 className='text-gray-500 text-lg font-medium p-3'>Todos</h3>
              <div className=''>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className='flex flex-row items-center gap-5 p-3 w-full rounded-md'
                  >
                    <div
                      className={cn(category.color, 'w-4 h-4 rounded-full')}
                    />
                    <p>{category.display}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className=''>
              <DropdownMenu>
                <DropdownMenuTrigger className='w-full' asChild>
                  <div className='flex flex-row items-center gap-4'>
                    <Avatar>
                      <AvatarImage
                        src='https://github.com/shadcn.png'
                        alt='@shadcn'
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h3>{user ? user.firstName : 'Undefined'}</h3>
                  </div>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    // <div className='flex flex-row gap-3 items-start'>
    <div className='fixed left-0 top-0 w-full h-full'>
      <div className='sidebar h-full bg-slate-100  w-1/6 flex flex-col items-start justify-between px-3 py-10 pt-16'>
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
              <h3 className={`text-lg text-black`}>{item.title}</h3>
            </Link>
          ))}
          <h3 className='text-gray-500 text-lg font-medium p-3'>Todos</h3>
          <div className=''>
            {categories.map((category, index) => (
              <div
                key={index}
                className='flex flex-row items-center gap-5 p-3 w-full rounded-md'
              >
                <div className={cn(category.color, 'w-4 h-4 rounded-full')} />
                <p>{category.display}</p>
              </div>
            ))}
          </div>
        </div>
        <div className=''>
          <DropdownMenu>
            <DropdownMenuTrigger className='w-full' asChild>
              <div className='flex flex-row items-center gap-4'>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h3>{user ? user.firstName : 'Undefined'}</h3>
              </div>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
