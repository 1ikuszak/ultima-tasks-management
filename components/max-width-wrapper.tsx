'use client'

import { useFullScreen } from '@/lib/context/FullScreenContext'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  const { isFullScreen } = useFullScreen()
  return (
    <div
      className={cn(
        'mx-auto w-full px-2.5',
        isFullScreen ? '' : 'max-w-screen-2xl md:px-20'
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper
