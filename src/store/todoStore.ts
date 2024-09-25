import { fetchUserTodosAction } from '@/app/_actions/todos'
import { create } from 'zustand'

interface Todo {
  id: string
  title: string
  description: string
  status: 'PENDING' | 'COMPLETED' | 'NOT_STARTED'
  startDate: Date
  expectedFinishDate: Date
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
}

interface TodoStoreInterface {
  todos: Todo[]
  fetchUserTodos: (userId: string) => Promise<void>
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  clearTodos: () => void
}

export const todoStore = create<TodoStoreInterface>((set, get) => ({
  todos: [],

  // Fetch todos from the server using userId
  fetchUserTodos: async (userId: string) => {
    const data = await fetchUserTodosAction(userId)
    set({ todos: data })
  },

  // Set todos manually (useful when fetching todos)
  setTodos: (todos: Todo[]) => set({ todos }),

  // Add a new todo to the list
  addTodo: (todo: Todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),

  // Clear todos (useful when logging out)
  clearTodos: () => set({ todos: [] }),
}))
