import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@e412/rnui-react'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Default active tab value',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here.
        </p>
      </TabsContent>
    </Tabs>
  ),
}

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Account settings.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Password settings.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">General settings.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Account settings.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Password settings.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">General settings.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const VerticalLineVariant: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="w-[400px]">
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Account settings with line variant.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Password settings with line variant.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">General settings with line variant.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled>Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Account content.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">Settings content.</p>
      </TabsContent>
    </Tabs>
  ),
}
