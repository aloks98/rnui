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
import { CheckIcon, LoaderCircleIcon, ArrowLeftIcon } from 'lucide-react'

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stepper orientation',
    },
    defaultValue: {
      control: { type: 'number', min: 1 },
      description: 'Default active step',
    },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

// --- Basic stepper (c-stepper-1) ---
export const Basic: Story = {
  render: () => {
    const steps = [1, 2, 3, 4]
    return (
      <Stepper defaultValue={2} className="w-full max-w-md space-y-8">
        <StepperNav>
          {steps.map((step) => (
            <StepperItem key={step} step={step}>
              <StepperTrigger>
                <StepperIndicator>{step}</StepperIndicator>
              </StepperTrigger>
              {steps.length > step && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step) => (
            <StepperContent
              key={step}
              value={step}
              className="flex items-center justify-center"
            >
              Step {step} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Stepper with completed state styling (c-stepper-2) ---
export const CompletedState: Story = {
  render: () => {
    const steps = [1, 2, 3, 4]
    return (
      <Stepper defaultValue={2} className="w-full max-w-md space-y-8">
        <StepperNav>
          {steps.map((step) => (
            <StepperItem key={step} step={step}>
              <StepperTrigger>
                <StepperIndicator className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=inactive]:text-gray-500">
                  {step}
                </StepperIndicator>
              </StepperTrigger>
              {steps.length > step && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-green-500" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step) => (
            <StepperContent
              key={step}
              value={step}
              className="flex w-full items-center justify-center"
            >
              Step {step} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Stepper with loading state (c-stepper-3) ---
export const LoadingState: Story = {
  render: () => {
    const steps = [1, 2, 3]
    return (
      <Stepper
        className="w-full max-w-md"
        defaultValue={2}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
      >
        <StepperNav className="mb-5">
          {steps.map((step) => (
            <StepperItem key={step} step={step} loading={step === 2}>
              <StepperTrigger>
                <StepperIndicator className="data-[state=active]:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:border-primary data-[state=inactive]:border-muted size-5 border-2 data-[state=completed]:border-green-500 data-[state=completed]:bg-green-500 data-[state=completed]:text-white">
                  <span className="bg-primary-foreground hidden size-1.5 rounded-full group-data-[state=active]/step:block" />
                </StepperIndicator>
              </StepperTrigger>
              {steps.length > step && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-green-500" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step) => (
            <StepperContent
              key={step}
              value={step}
              className="flex w-full items-center justify-center"
            >
              Step {step} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Controlled stepper with prev/next buttons (c-stepper-4) ---
export const Controlled: Story = {
  render: () => {
    const steps = [1, 2, 3, 4]
    const [currentStep, setCurrentStep] = useState(2)
    return (
      <Stepper
        value={currentStep}
        onValueChange={setCurrentStep}
        className="w-full max-w-md space-y-8"
      >
        <StepperNav>
          {steps.map((step) => (
            <StepperItem key={step} step={step}>
              <StepperTrigger asChild>
                <StepperIndicator className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=inactive]:text-gray-500">
                  {step}
                </StepperIndicator>
              </StepperTrigger>
              {steps.length > step && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-green-500" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step) => (
            <StepperContent
              key={step}
              value={step}
              className="flex w-full items-center justify-center"
            >
              Step {step} content
            </StepperContent>
          ))}
        </StepperPanel>
        <div className="flex items-center justify-between gap-2.5">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={currentStep === steps.length}
          >
            Next
          </Button>
        </div>
      </Stepper>
    )
  },
}

// --- Stepper with title and indicator icons (c-stepper-5) ---
export const WithTitles: Story = {
  render: () => {
    const steps = [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]
    return (
      <Stepper
        className="w-full max-w-md space-y-8"
        defaultValue={2}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            >
              {step.title} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Stepper with progress bar indicator (c-stepper-6) ---
export const ProgressBar: Story = {
  render: () => {
    const steps = [
      { title: 'User Details' },
      { title: 'Payment Info' },
      { title: 'Auth OTP' },
      { title: 'Preview Form' },
    ]
    return (
      <Stepper
        defaultValue={2}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
        className="w-full max-w-lg space-y-8"
      >
        <StepperNav className="gap-3">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex grow flex-col items-start justify-center gap-3">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start font-semibold">
                  {step.title}
                </StepperTitle>
              </StepperTrigger>
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            >
              {step.title} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Stepper with descriptions (c-stepper-8) ---
export const WithDescriptions: Story = {
  render: () => {
    const steps = [
      { title: 'Account', description: 'Create your account' },
      { title: 'Profile', description: 'Set up your profile' },
      { title: 'Complete', description: 'Review and finish' },
    ]
    return (
      <Stepper
        defaultValue={2}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
        className="w-full max-w-md space-y-8"
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
                <StepperDescription>{step.description}</StepperDescription>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-2.5 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            >
              {step.title} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Stepper with inline titles (c-stepper-9) ---
export const InlineTitles: Story = {
  render: () => {
    const steps = [{ title: 'Account' }, { title: 'Profile' }, { title: 'Review' }]
    return (
      <Stepper
        defaultValue={2}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
        className="w-full max-w-md space-y-8"
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem key={index} step={index + 1} className="relative">
              <StepperTrigger className="flex justify-start gap-1.5">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-primary md:mx-2.5" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            >
              {step.title} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Stepper with content and inline descriptions (c-stepper-10) ---
export const WithContentAndDescriptions: Story = {
  render: () => {
    const steps = [
      { title: 'Step 1', description: 'Description' },
      { title: 'Step 2', description: 'Description' },
      { title: 'Step 3', description: 'Description' },
    ]
    return (
      <Stepper
        defaultValue={2}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
        className="w-full max-w-lg space-y-8"
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem key={index} step={index + 1} className="relative">
              <StepperTrigger className="flex justify-start gap-1.5">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <div className="flex flex-col items-start gap-0.5">
                  <StepperTitle>{step.title}</StepperTitle>
                  <StepperDescription>{step.description}</StepperDescription>
                </div>
              </StepperTrigger>
              {steps.length > index + 1 && (
                <StepperSeparator className="md:mx-2.5" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            >
              {step.title} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Stepper with progress bar and titles (c-stepper-11) ---
export const ProgressBarWithTitles: Story = {
  render: () => {
    const steps = [
      { title: 'User Details' },
      { title: 'Payment Info' },
      { title: 'Auth OTP' },
      { title: 'Preview Form' },
    ]
    return (
      <Stepper defaultValue={2} className="w-full max-w-lg space-y-8">
        <StepperNav className="mb-10 gap-5">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex grow flex-col items-start justify-center gap-3.5">
                <StepperIndicator className="bg-border data-[state=active]:bg-primary data-[state=completed]:bg-primary h-1 w-full rounded-full">
                  <span className="sr-only">{index + 1}</span>
                </StepperIndicator>
                <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start font-semibold">
                  {step.title}
                </StepperTitle>
              </StepperTrigger>
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="text-sm">
          {steps.map((step, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center"
            >
              {step.title} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    )
  },
}

// --- Stepper with segmented progress bar (c-stepper-12) ---
export const SegmentedProgressBar: Story = {
  render: () => {
    const steps = [1, 2, 3, 4]
    const [currentStep, setCurrentStep] = useState(1)
    return (
      <div className="w-full max-w-md">
        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          <StepperNav>
            {steps.map((step) => (
              <StepperItem
                key={step}
                step={step}
                className="flex-1 overflow-hidden first:rounded-s-full last:rounded-e-full transition-all duration-300"
              >
                <StepperTrigger
                  className="w-full flex-col items-start gap-2"
                  asChild
                >
                  <StepperIndicator className="bg-border h-2 w-full !rounded-none">
                    <span className="sr-only">{step}</span>
                  </StepperIndicator>
                </StepperTrigger>
              </StepperItem>
            ))}
          </StepperNav>
          <div className="flex items-center justify-between gap-2.5 py-1">
            <Button
              variant="link"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className={currentStep === 1 ? 'pointer-events-none opacity-0' : 'px-0'}
            >
              <ArrowLeftIcon className="size-4" />
              Back
            </Button>
            <div className="text-sm font-medium">
              <span className="text-foreground">{currentStep}</span>{' '}
              <span className="text-muted-foreground/60">/ {steps.length}</span>
            </div>
          </div>
          <StepperPanel className="py-6 text-sm">
            {steps.map((step) => (
              <StepperContent
                key={step}
                value={step}
                className="flex w-full items-center justify-center"
              >
                Step {step} content
              </StepperContent>
            ))}
          </StepperPanel>
          <div className="flex items-center justify-end gap-2.5">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={currentStep === steps.length}
            >
              Next
            </Button>
          </div>
        </Stepper>
      </div>
    )
  },
}

// --- Vertical orientation (c-stepper-14) ---
export const Vertical: Story = {
  render: () => {
    const steps = [1, 2, 3]
    return (
      <div className="flex items-center justify-center">
        <Stepper
          className="flex flex-col items-center justify-center gap-10"
          defaultValue={2}
          orientation="vertical"
          indicators={{
            completed: <CheckIcon className="size-3.5" />,
            loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
          }}
        >
          <StepperNav>
            {steps.map((step) => (
              <StepperItem key={step} step={step} loading={step === 2}>
                <StepperTrigger>
                  <StepperIndicator className="data-[state=completed]:bg-green-500 data-[state=completed]:text-white">
                    {step}
                  </StepperIndicator>
                </StepperTrigger>
                {steps.length > step && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-green-500" />
                )}
              </StepperItem>
            ))}
          </StepperNav>
          <StepperPanel className="w-56 text-center text-sm">
            {steps.map((step) => (
              <StepperContent key={step} value={step}>
                Step {step} content
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
      </div>
    )
  },
}

// --- Vertical with titles (c-stepper-15) ---
export const VerticalWithTitles: Story = {
  render: () => {
    const steps = [{ title: 'Account' }, { title: 'Profile' }, { title: 'Review' }]
    return (
      <div className="flex items-center justify-center">
        <Stepper
          className="flex flex-col items-center justify-center gap-10"
          defaultValue={2}
          orientation="vertical"
          indicators={{
            completed: <CheckIcon className="size-3.5" />,
            loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
          }}
        >
          <StepperNav>
            {steps.map((step, index) => (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative items-start not-last:flex-1"
              >
                <StepperTrigger className="items-start gap-2.5 pb-12 last:pb-0">
                  <StepperIndicator className="data-[state=completed]:bg-green-500 data-[state=completed]:text-white">
                    {index + 1}
                  </StepperIndicator>
                  <div className="mt-0.5 text-left">
                    <StepperTitle>{step.title}</StepperTitle>
                  </div>
                </StepperTrigger>
                {index < steps.length - 1 && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-green-500 absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]" />
                )}
              </StepperItem>
            ))}
          </StepperNav>
          <StepperPanel className="w-56 text-center text-sm">
            {steps.map((step, index) => (
              <StepperContent key={index} value={index + 1}>
                {step.title} content
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
      </div>
    )
  },
}

// --- Vertical with descriptions (c-stepper-13) ---
export const VerticalWithDescriptions: Story = {
  render: () => {
    const steps = [
      { title: 'Account', description: 'Create your account' },
      { title: 'Profile', description: 'Set up your profile' },
      { title: 'Review', description: 'Confirm your details' },
    ]
    return (
      <div className="flex items-center justify-center">
        <Stepper
          className="flex flex-col items-center justify-center gap-10"
          defaultValue={2}
          orientation="vertical"
          indicators={{
            completed: <CheckIcon className="size-3.5" />,
            loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
          }}
        >
          <StepperNav>
            {steps.map((step, index) => (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative items-start not-last:flex-1"
              >
                <StepperTrigger className="items-start gap-2.5 pb-12 last:pb-0">
                  <StepperIndicator className="data-[state=completed]:bg-green-500 data-[state=completed]:text-white">
                    {index + 1}
                  </StepperIndicator>
                  <div className="mt-0.5 text-left">
                    <StepperTitle>{step.title}</StepperTitle>
                    <StepperDescription>{step.description}</StepperDescription>
                  </div>
                </StepperTrigger>
                {index < steps.length - 1 && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-green-500 absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]" />
                )}
              </StepperItem>
            ))}
          </StepperNav>
          <StepperPanel className="w-56 text-center text-sm">
            {steps.map((step, index) => (
              <StepperContent key={index} value={index + 1}>
                {step.title} content
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
      </div>
    )
  },
}
