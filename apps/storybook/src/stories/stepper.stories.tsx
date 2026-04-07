import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
  StepperNav,
  StepperPanel,
  StepperContent,
  Button,
} from '@e412/rnui-react'
import { CheckIcon, LoaderIcon } from 'lucide-react'

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Stepper defaultValue={2}>
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <StepperTitle>Account</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <StepperTitle>Profile</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={3}>
          <StepperTrigger>
            <StepperIndicator>3</StepperIndicator>
            <StepperTitle>Review</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <Stepper defaultValue={1}>
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <div>
              <StepperTitle>Account</StepperTitle>
              <StepperDescription>Create your account</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <div>
              <StepperTitle>Profile</StepperTitle>
              <StepperDescription>Set up your profile</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={3}>
          <StepperTrigger>
            <StepperIndicator>3</StepperIndicator>
            <div>
              <StepperTitle>Complete</StepperTitle>
              <StepperDescription>Review and finish</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
  ),
}

export const WithIndicatorIcons: Story = {
  render: () => (
    <Stepper
      defaultValue={2}
      indicators={{
        completed: <CheckIcon className="size-3.5" />,
        loading: <LoaderIcon className="size-3.5 animate-spin" />,
      }}
    >
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <StepperTitle>Account</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <StepperTitle>Profile</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={3}>
          <StepperTrigger>
            <StepperIndicator>3</StepperIndicator>
            <StepperTitle>Review</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
  ),
}

export const WithContent: Story = {
  render: () => {
    const [step, setStep] = useState(1)
    return (
      <Stepper
        value={step}
        onValueChange={setStep}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
        }}
      >
        <StepperNav>
          <StepperItem step={1}>
            <StepperTrigger>
              <StepperIndicator>1</StepperIndicator>
              <StepperTitle>Account</StepperTitle>
            </StepperTrigger>
            <StepperSeparator />
          </StepperItem>
          <StepperItem step={2}>
            <StepperTrigger>
              <StepperIndicator>2</StepperIndicator>
              <StepperTitle>Profile</StepperTitle>
            </StepperTrigger>
            <StepperSeparator />
          </StepperItem>
          <StepperItem step={3}>
            <StepperTrigger>
              <StepperIndicator>3</StepperIndicator>
              <StepperTitle>Complete</StepperTitle>
            </StepperTrigger>
          </StepperItem>
        </StepperNav>
        <StepperPanel className="mt-6">
          <StepperContent value={1}>
            <div className="rounded-lg border p-4">
              <p className="text-sm">Step 1: Create your account with email and password.</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => setStep(2)}>Continue</Button>
              </div>
            </div>
          </StepperContent>
          <StepperContent value={2}>
            <div className="rounded-lg border p-4">
              <p className="text-sm">Step 2: Fill in your profile information.</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button size="sm" onClick={() => setStep(3)}>Continue</Button>
              </div>
            </div>
          </StepperContent>
          <StepperContent value={3}>
            <div className="rounded-lg border p-4">
              <p className="text-sm">Step 3: Review your information and submit.</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button size="sm">Submit</Button>
              </div>
            </div>
          </StepperContent>
        </StepperPanel>
      </Stepper>
    )
  },
}

export const Vertical: Story = {
  render: () => (
    <Stepper defaultValue={2} orientation="vertical">
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <div>
              <StepperTitle>Account</StepperTitle>
              <StepperDescription>Create your account</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <div>
              <StepperTitle>Profile</StepperTitle>
              <StepperDescription>Set up your profile</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={3}>
          <StepperTrigger>
            <StepperIndicator>3</StepperIndicator>
            <div>
              <StepperTitle>Complete</StepperTitle>
              <StepperDescription>Review and finish</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
  ),
}
