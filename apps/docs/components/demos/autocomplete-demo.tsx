'use client'

import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
} from '@e412/rnui-react'

export function AutocompleteDemo() {
  return (
    <Autocomplete>
      <AutocompleteInput placeholder="Search fruits..." showTrigger />
      <AutocompleteContent>
        <AutocompleteList>
          <AutocompleteItem value="apple">Apple</AutocompleteItem>
          <AutocompleteItem value="banana">Banana</AutocompleteItem>
          <AutocompleteItem value="blueberry">Blueberry</AutocompleteItem>
          <AutocompleteItem value="cherry">Cherry</AutocompleteItem>
          <AutocompleteItem value="grapes">Grapes</AutocompleteItem>
          <AutocompleteItem value="mango">Mango</AutocompleteItem>
          <AutocompleteItem value="orange">Orange</AutocompleteItem>
        </AutocompleteList>
        <AutocompleteEmpty>No results found.</AutocompleteEmpty>
      </AutocompleteContent>
    </Autocomplete>
  )
}
