'use client'

import { Toaster, Button } from '@e412/rnui-react'
import { toast } from 'sonner'

export function SonnerDemo() {
  return (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
          })
        }
      >
        Show Toast
      </Button>
    </div>
  )
}
