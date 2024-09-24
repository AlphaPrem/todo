import React from 'react'
import prisma from '../db/db'

export async function getAllTodos() {
  const todos = await prisma.todos.count()

  console.log(todos)
}

const Dashboard = () => {
  return <div>Dashboard</div>
}

export default Dashboard
