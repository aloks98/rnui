import type { Meta, StoryObj } from '@storybook/react'
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  Label,
} from '@e412/rnui-react'

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

const fruits = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grapes', 'Mango', 'Orange', 'Pineapple', 'Strawberry']

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label>Fruit</Label>
      <Autocomplete>
        <AutocompleteInput placeholder="Search a fruit..." />
        <AutocompleteContent>
          <AutocompleteList>
            {fruits.map((fruit) => (
              <AutocompleteItem key={fruit} value={fruit}>
                {fruit}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>
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
      <Autocomplete>
        <AutocompleteInput placeholder="Search produce..." />
        <AutocompleteContent>
          <AutocompleteList>
            <AutocompleteGroup>
              <AutocompleteGroupLabel>Fruits</AutocompleteGroupLabel>
              {fruits.map((fruit) => (
                <AutocompleteItem key={fruit} value={fruit}>
                  {fruit}
                </AutocompleteItem>
              ))}
            </AutocompleteGroup>
            <AutocompleteGroup>
              <AutocompleteGroupLabel>Vegetables</AutocompleteGroupLabel>
              {vegetables.map((vegetable) => (
                <AutocompleteItem key={vegetable} value={vegetable}>
                  {vegetable}
                </AutocompleteItem>
              ))}
            </AutocompleteGroup>
          </AutocompleteList>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  ),
}

export const WithClear: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label>Fruit</Label>
      <Autocomplete>
        <AutocompleteInput placeholder="Search a fruit..." showClear />
        <AutocompleteContent>
          <AutocompleteList>
            {fruits.map((fruit) => (
              <AutocompleteItem key={fruit} value={fruit}>
                {fruit}
              </AutocompleteItem>
            ))}
          </AutocompleteList>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  ),
}
