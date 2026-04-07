import type { Meta, StoryObj } from '@storybook/react'
import {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineSeparator,
  TimelineTitle,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
} from '@e412/rnui-react'

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Timeline defaultValue={3}>
      <TimelineItem step={1}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineHeader>
          <TimelineDate>Jan 2024</TimelineDate>
          <TimelineTitle>Project Started</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Initial project setup and planning phase completed.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={2}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineHeader>
          <TimelineDate>Mar 2024</TimelineDate>
          <TimelineTitle>Design Phase</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>UI/UX design completed and approved by stakeholders.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={3}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineHeader>
          <TimelineDate>Jun 2024</TimelineDate>
          <TimelineTitle>Development</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Core features implemented and tested.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={4}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineHeader>
          <TimelineDate>Sep 2024</TimelineDate>
          <TimelineTitle>Launch</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Product launched to production.</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

export const AllCompleted: Story = {
  render: () => (
    <Timeline defaultValue={5}>
      <TimelineItem step={1}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineHeader>
          <TimelineTitle>Order Placed</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Your order has been confirmed.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={2}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineHeader>
          <TimelineTitle>Processing</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Your order is being prepared.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={3}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineHeader>
          <TimelineTitle>Shipped</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Your package is on its way.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={4}>
        <TimelineIndicator />
        <TimelineHeader>
          <TimelineTitle>Delivered</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Package delivered successfully.</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Timeline defaultValue={2} orientation="horizontal">
      <TimelineItem step={1}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineTitle>Step 1</TimelineTitle>
        <TimelineContent>First step done.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={2}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineTitle>Step 2</TimelineTitle>
        <TimelineContent>In progress.</TimelineContent>
      </TimelineItem>
      <TimelineItem step={3}>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineTitle>Step 3</TimelineTitle>
        <TimelineContent>Not started.</TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}
