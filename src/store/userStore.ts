import { create } from 'zustand'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface UserStoreInterface {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
}

export const userStore = create<UserStoreInterface>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) =>
    set({
      user,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))
