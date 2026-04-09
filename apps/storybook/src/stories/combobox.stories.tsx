import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
} from '@e412/rnui-react'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' },
]

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Search fruits..." />
      <ComboboxContent>
        <ComboboxList>
          {fruits.map((fruit) => (
            <ComboboxItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithClearButton: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Search fruits..." showClear />
      <ComboboxContent>
        <ComboboxList>
          {fruits.map((fruit) => (
            <ComboboxItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Search..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Fruits</ComboboxLabel>
            <ComboboxItem value="apple">Apple</ComboboxItem>
            <ComboboxItem value="banana">Banana</ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxLabel>Vegetables</ComboboxLabel>
            <ComboboxItem value="carrot">Carrot</ComboboxItem>
            <ComboboxItem value="broccoli">Broccoli</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Disabled combobox" disabled />
      <ComboboxContent>
        <ComboboxList>
          {fruits.map((fruit) => (
            <ComboboxItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
