import type { Meta, StoryObj } from '@storybook/react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Label,
} from '@e412/rnui-react'

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label>Website</Label>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
    </div>
  ),
}
