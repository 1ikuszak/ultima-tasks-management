'use client'

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'

interface FullScreenContextType {
  isFullScreen: boolean
  toggleFullScreen: () => void
}

const defaultContextValue: FullScreenContextType = {
  isFullScreen: false,
  toggleFullScreen: () => {}, // Provide a noop function as a placeholder
}

export const FullScreenContext =
  createContext<FullScreenContextType>(defaultContextValue)

export const FullScreenProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const handleFullScreenChange = useCallback(() => {
    const isNowFullScreen = !!document.fullscreenElement
    setIsFullScreen(isNowFullScreen)
  }, [])

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true)
      })
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false)
      })
    }
  }, [])

  // Effect to handle fullscreen change events
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [handleFullScreenChange])

  return (
    <FullScreenContext.Provider value={{ isFullScreen, toggleFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  )
}

export const useFullScreen = () => useContext(FullScreenContext)
