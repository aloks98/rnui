import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription, AlertAction, Button } from '@e412/rnui-react'
import { InfoIcon, CircleCheckIcon, TriangleAlertIcon, OctagonXIcon } from 'lucide-react'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'info', 'success', 'warning', 'invert'],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="max-w-lg">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-lg">
      <OctagonXIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  render: () => (
    <Alert variant="info" className="max-w-lg">
      <InfoIcon />
      <AlertTitle>Did you know?</AlertTitle>
      <AlertDescription>
        You can use keyboard shortcuts to navigate faster.
      </AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="max-w-lg">
      <CircleCheckIcon />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="max-w-lg">
      <TriangleAlertIcon />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your account is approaching its storage limit.
      </AlertDescription>
    </Alert>
  ),
}

export const Invert: Story = {
  render: () => (
    <Alert variant="invert" className="max-w-lg">
      <AlertTitle>Tip</AlertTitle>
      <AlertDescription>
        Use the command palette to quickly access any feature.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert variant="info" className="max-w-lg">
      <InfoIcon />
      <AlertTitle>New update available</AlertTitle>
      <AlertDescription>
        A new version is available. Update now to get the latest features.
      </AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </AlertAction>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '32rem' }}>
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is the default alert variant.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <OctagonXIcon />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This is the destructive alert variant.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is the info alert variant.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is the success alert variant.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>This is the warning alert variant.</AlertDescription>
      </Alert>
      <Alert variant="invert">
        <AlertTitle>Invert</AlertTitle>
        <AlertDescription>This is the invert alert variant.</AlertDescription>
      </Alert>
    </div>
  ),
}
