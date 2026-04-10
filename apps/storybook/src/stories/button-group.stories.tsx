import type { Meta, StoryObj } from '@storybook/react'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  Button,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@e412/rnui-react'
import {
  PlusIcon,
  ChevronDownIcon,
  SearchIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  MinusIcon,
} from 'lucide-react'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <Button variant="outline">Snooze</Button>
    </ButtonGroup>
  ),
}

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary" size="sm">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">Paste</Button>
    </ButtonGroup>
  ),
}

export const SplitButton: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const WithDropdown: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" className="pl-2!" />}
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CopyIcon />
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ),
}

export const WithInput: Story = {
  render: () => (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <ButtonGroup>
        <Button variant="outline" size="sm">Small</Button>
        <Button variant="outline" size="sm">Button</Button>
        <Button variant="outline" size="sm">Group</Button>
        <Button variant="outline" size="icon-sm">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Button</Button>
        <Button variant="outline">Group</Button>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">Large</Button>
        <Button variant="outline" size="lg">Button</Button>
        <Button variant="outline" size="lg">Group</Button>
        <Button variant="outline" size="icon-lg">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  ),
}

export const Nested: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="sm">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
        <Button variant="outline" size="sm">4</Button>
        <Button variant="outline" size="sm">5</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon-sm" aria-label="Previous">
          <ArrowLeftIcon />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Next">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" className="h-fit">
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  ),
}
