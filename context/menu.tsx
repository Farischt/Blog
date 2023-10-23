import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface MenuContext {
  open: boolean
  setOpen: Dispatch<SetStateAction<MenuContext['open']>>
  changeState: () => void
}

export const MenuContext = createContext<MenuContext | undefined>(undefined)

export interface MenuProviderProps {
  children: React.ReactNode
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const changeState = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const handleRouteChange = () => {
      if (open) setOpen(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return (
    <MenuContext.Provider value={{ open, setOpen, changeState }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
