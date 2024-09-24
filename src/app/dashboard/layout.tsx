import React from 'react'

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='m-10'>
      <h2 className='text-4xl font-semibold my-3'>Dashboard</h2>
      <div className=''>{children}</div>
    </div>
  )
}

export default DashboardLayout
