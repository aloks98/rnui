import type { Meta, StoryObj } from '@storybook/react'
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
  Label,
} from '@e412/rnui-react'

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

const fruits = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grapes', 'Mango', 'Orange', 'Pineapple', 'Strawberry']

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label>Fruit</Label>
      <Autocomplete items={fruits}>
        <AutocompleteInput placeholder="Search a fruit..." />
        <AutocompleteContent>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  ),
}

const vegetables = ['Broccoli', 'Carrot', 'Cucumber', 'Lettuce', 'Spinach', 'Tomato']

export const WithGroups: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label>Produce</Label>
      <Autocomplete
        items={[
          { label: 'Fruits', items: fruits },
          { label: 'Vegetables', items: vegetables },
        ]}
      >
        <AutocompleteInput placeholder="Search produce..." />
        <AutocompleteContent>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  ),
}

export const WithClear: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label>Fruit</Label>
      <Autocomplete items={fruits}>
        <AutocompleteInput placeholder="Search a fruit..." showClear />
        <AutocompleteContent>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  ),
}
