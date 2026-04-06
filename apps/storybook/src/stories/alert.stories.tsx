import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription, AlertAction, Button } from '@e412/rnui-react'

const meta = {
  title: 'Components/Alert',
  component: Alert,
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert className="max-w-md">
      <AlertTitle>New update available</AlertTitle>
      <AlertDescription>
        A new version is available. Update now to get the latest features.
      </AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">Update</Button>
      </AlertAction>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '28rem' }}>
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is the default alert variant.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This is the destructive alert variant.</AlertDescription>
      </Alert>
    </div>
  ),
}
