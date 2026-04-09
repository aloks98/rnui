import type { Meta, StoryObj } from '@storybook/react'
import {
  Input,
  Label,
  Button,
  Badge,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
} from '@e412/rnui-react'
import { SearchIcon, MailIcon, LockIcon, EyeIcon } from 'lucide-react'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'file'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
    className: 'max-w-sm',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="you@example.com" />
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email-desc">Email</Label>
      <Input type="email" id="email-desc" placeholder="you@example.com" />
      <p className="text-sm text-muted-foreground">We'll never share your email.</p>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    className: 'max-w-sm',
  },
}

export const Invalid: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email-invalid">Email</Label>
      <Input type="email" id="email-invalid" placeholder="you@example.com" aria-invalid="true" />
      <p className="text-sm text-destructive">Please enter a valid email address.</p>
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="name-req">
        Name <span className="text-destructive">*</span>
      </Label>
      <Input id="name-req" placeholder="Enter your name" required />
    </div>
  ),
}

export const File: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  ),
}

export const Password: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="Enter password" />
    </div>
  ),
}

export const WithLabelAndBadge: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <div className="flex items-center gap-2">
        <Label htmlFor="display-name">Display Name</Label>
        <Badge variant="secondary" size="xs">Recommended</Badge>
      </div>
      <Input id="display-name" placeholder="How others see you" />
    </div>
  ),
}

export const Inline: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid w-full max-w-lg grid-cols-2 gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="first-name">First Name</Label>
        <Input id="first-name" placeholder="John" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="last-name">Last Name</Label>
        <Input id="last-name" placeholder="Doe" />
      </div>
    </div>
  ),
}

export const WithInputGroup: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label>Website</Label>
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
    </div>
  ),
}

export const WithIconAddon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label>Email</Label>
        <InputGroup>
          <InputGroupAddon>
            <MailIcon className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput placeholder="you@example.com" />
        </InputGroup>
      </div>
      <div className="grid gap-1.5">
        <Label>Password</Label>
        <InputGroup>
          <InputGroupAddon>
            <LockIcon className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput type="password" placeholder="Enter password" />
          <InputGroupButton variant="ghost" size="icon-sm">
            <EyeIcon className="size-4" />
          </InputGroupButton>
        </InputGroup>
      </div>
    </div>
  ),
}

export const SearchWithButton: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon className="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search components..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <form className="grid w-full max-w-lg gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="f-first">First Name</Label>
          <Input id="f-first" placeholder="John" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="f-last">Last Name</Label>
          <Input id="f-last" placeholder="Doe" />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="f-email">Email</Label>
        <Input id="f-email" type="email" placeholder="john@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="f-phone">Phone</Label>
        <Input id="f-phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="f-address">Address</Label>
        <Input id="f-address" placeholder="123 Main St, City, State" />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="reset">Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  ),
}
