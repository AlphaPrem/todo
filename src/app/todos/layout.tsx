import Sidebar from '@/components/nav/Sidebar'
import React from 'react'

const TodosLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='m-10 pl-3 lg:w-4/5 lg:float-right'>
      <div className='flex flex-row items-center justify-between'>
        <h2 className='text-4xl font-semibold my-3'>Todos</h2>
        <div className='block lg:hidden'>
          <Sidebar />
        </div>
      </div>
      <div>Search bar</div>
      <div className=''>{children}</div>
    </div>
  )
}

export default TodosLayout
