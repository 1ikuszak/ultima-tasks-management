'use client'

import { useFullScreen } from '@/lib/context/FullScreenContext'

import { Button } from '../ui/button'
import { Icons } from '../icons'

export function FullScreenToggle() {
  const { toggleFullScreen, isFullScreen } = useFullScreen()

  return (
    <Button
      onClick={toggleFullScreen}
      className="rounded-lg"
      variant={'outline'}
      size="icon"
    >
      {isFullScreen && <Icons.shrink className="h-[1.2rem] w-[1.2rem]" />}
      {!isFullScreen && <Icons.expand className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  )
}
