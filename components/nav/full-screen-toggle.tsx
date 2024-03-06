'use client'

import { useFullScreen } from '@/lib/context/FullScreenContext'

import Icon from '../Icon'
import { Button } from '../ui/button'

export function FullScreenToggle() {
  const { toggleFullScreen, isFullScreen } = useFullScreen()

  return (
    <Button
      onClick={toggleFullScreen}
      className="rounded-lg"
      variant={'outline'}
      size="icon"
    >
      {isFullScreen && <Icon name="shrink" className="h-[1.2rem] w-[1.2rem]" />}
      {!isFullScreen && (
        <Icon name="expand" className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  )
}
