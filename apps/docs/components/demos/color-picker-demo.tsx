'use client'

import { useState } from 'react'
import { ColorPicker } from '@e412/rnui-react'

export function ColorPickerDemo() {
  const [color, setColor] = useState('#3b82f6')
  return <ColorPicker value={color} onChange={setColor} />
}
