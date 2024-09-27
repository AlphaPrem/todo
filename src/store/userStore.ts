import { User } from '@/app/interface/User'
import { create } from 'zustand'

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
