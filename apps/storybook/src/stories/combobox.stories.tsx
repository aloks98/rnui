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
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxValue,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  useComboboxAnchor,
} from '@e412/rnui-react'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

export const Default: Story = {
  render: () => (
    <Combobox items={fruits}>
      <ComboboxInput placeholder="Search fruits..." />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const WithClearButton: Story = {
  render: () => (
    <Combobox items={fruits}>
      <ComboboxInput placeholder="Search fruits..." showClear />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

const allItems = [
  { value: 'apple', group: 'Fruits' },
  { value: 'banana', group: 'Fruits' },
  { value: 'carrot', group: 'Vegetables' },
  { value: 'broccoli', group: 'Vegetables' },
]

export const WithGroups: Story = {
  render: () => (
    <Combobox items={allItems.map((i) => i.value)}>
      <ComboboxInput placeholder="Search..." />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
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

const tags = [
  'React',
  'TypeScript',
  'Tailwind',
  'Next.js',
  'Node.js',
  'GraphQL',
  'Prisma',
  'tRPC',
]

export const TagsInput: Story = {
  render: () => {
    const anchor = useComboboxAnchor()
    return (
      <Combobox items={tags} multiple defaultValue={['React', 'TypeScript']}>
        <ComboboxChips ref={anchor} className="w-full max-w-sm">
          <ComboboxValue>
            {(value) => (
              <>
                {value.map((tag: string) => (
                  <ComboboxChip key={tag} aria-label={tag}>
                    {tag}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  placeholder={value.length > 0 ? '' : 'Add tags...'}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No tags found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const CreatableTags: Story = {
  render: () => {
    const anchor = useComboboxAnchor()
    const [value, setValue] = React.useState<string[]>(['React'])
    const [inputValue, setInputValue] = React.useState('')
    // Base UI selects the highlighted suggestion on Enter itself, so only
    // treat Enter as "create" when nothing in the list is highlighted.
    const hasHighlightRef = React.useRef(false)

    function addTag(tag: string) {
      const next = tag.trim()
      if (next === '' || value.includes(next)) {
        return
      }
      setValue((current) => [...current, next])
      setInputValue('')
    }

    return (
      <Combobox
        items={tags}
        multiple
        value={value}
        onValueChange={setValue}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        onItemHighlighted={(item) => {
          hasHighlightRef.current = item != null
        }}
      >
        <ComboboxChips ref={anchor} className="w-full max-w-sm">
          <ComboboxValue>
            {(selected: string[]) => (
              <>
                {selected.map((tag) => (
                  <ComboboxChip key={tag} aria-label={tag}>
                    {tag}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  placeholder={selected.length > 0 ? '' : 'Add tags...'}
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' &&
                      !hasHighlightRef.current &&
                      inputValue.trim() !== ''
                    ) {
                      event.preventDefault()
                      addTag(inputValue)
                    }
                  }}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>
            {inputValue.trim() === ''
              ? 'No tags found.'
              : `Press Enter to add "${inputValue.trim()}"`}
          </ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <Combobox items={fruits}>
      <ComboboxInput placeholder="Disabled combobox" disabled />
      <ComboboxContent>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
