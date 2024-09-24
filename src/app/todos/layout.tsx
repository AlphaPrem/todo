import React from 'react'

const TodosLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='m-10'>
      <h2 className='text-4xl font-semibold my-3'>Todos</h2>
      <div>Search bar</div>
      <div className=''>{children}</div>
    </div>
  )
}

export default TodosLayout
