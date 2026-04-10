'use client'

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from '@e412/rnui-react'

export function ComboboxDemo() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Select a fruit..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="apple">Apple</ComboboxItem>
          <ComboboxItem value="banana">Banana</ComboboxItem>
          <ComboboxItem value="blueberry">Blueberry</ComboboxItem>
          <ComboboxItem value="cherry">Cherry</ComboboxItem>
          <ComboboxItem value="grapes">Grapes</ComboboxItem>
        </ComboboxList>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
