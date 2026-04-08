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
  Badge,
} from '@e412/rnui-react'
import { cn } from '@e412/rnui-react'
import {
  CheckIcon,
  GitForkIcon,
  GitPullRequestArrowIcon,
  GitMergeIcon,
  GitCompareArrowsIcon,
  XIcon,
} from 'lucide-react'

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Timeline orientation',
    },
    defaultValue: {
      control: { type: 'number', min: 1 },
      description: 'Default active step',
    },
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

// --- Basic timeline (c-timeline-1) ---
export const Basic: Story = {
  render: () => (
    <Timeline defaultValue={2} className="w-full max-w-md">
      <TimelineItem step={1}>
        <TimelineHeader>
          <TimelineDate>March 2024</TimelineDate>
          <TimelineTitle>Project Initialized</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          Successfully set up the project repository and initial architecture.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem step={2}>
        <TimelineHeader>
          <TimelineDate>April 2024</TimelineDate>
          <TimelineTitle>Beta Release</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          Launched the beta version for early testers and feedback.
        </TimelineContent>
      </TimelineItem>
      <TimelineItem step={3}>
        <TimelineHeader>
          <TimelineDate>June 2024</TimelineDate>
          <TimelineTitle>Official Launch</TimelineTitle>
        </TimelineHeader>
        <TimelineIndicator />
        <TimelineSeparator />
        <TimelineContent>
          The platform is now live for all users worldwide.
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
}

// --- Timeline with roadmap and side dates (c-timeline-2) ---
export const Roadmap: Story = {
  render: () => {
    const roadmap = [
      {
        id: 1,
        date: 'Jan 2025',
        title: 'AI Engine Integration',
        description:
          'Deep integration of advanced LLMs for real-time code generation and context-aware suggestions.',
      },
      {
        id: 2,
        date: 'Feb 2025',
        title: 'Collaborative Editing',
        description:
          'Multi-user real-time collaboration with shared cursors and instant synchronization.',
      },
      {
        id: 3,
        date: 'Mar 2025',
        title: 'Visual Theme Builder',
        description:
          'Interactive interface for creating and managing custom design systems.',
      },
      {
        id: 4,
        date: 'Apr 2025',
        title: 'Enterprise Security',
        description:
          'Role-based access control, SOC2 compliance, and enhanced encryption.',
      },
    ]
    return (
      <Timeline defaultValue={2} className="w-full max-w-md">
        {roadmap.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="sm:group-data-[orientation=vertical]/timeline:ms-32"
          >
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineDate className="sm:group-data-[orientation=vertical]/timeline:absolute sm:group-data-[orientation=vertical]/timeline:-left-32 sm:group-data-[orientation=vertical]/timeline:w-20 sm:group-data-[orientation=vertical]/timeline:text-right">
                {item.date}
              </TimelineDate>
              <TimelineTitle className="sm:-mt-0.5">{item.title}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>{item.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    )
  },
}

// --- Order status timeline with check icons (c-timeline-3) ---
export const OrderStatus: Story = {
  render: () => {
    const orderStatus = [
      {
        id: 1,
        date: 'Mar 15, 2024',
        title: 'Order Placed',
        description: 'Your order has been received and is being processed.',
      },
      {
        id: 2,
        date: 'Mar 16, 2024',
        title: 'Payment Confirmed',
        description: 'Transaction successful. Preparing for shipment.',
      },
      {
        id: 3,
        date: 'Mar 18, 2024',
        title: 'Shipped',
        description: 'Your package is on its way. Track your delivery.',
      },
      {
        id: 4,
        date: 'Mar 20, 2024',
        title: 'Delivered',
        description: 'Package successfully delivered to the recipient.',
      },
    ]
    return (
      <Timeline defaultValue={3} className="w-full max-w-md">
        {orderStatus.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineDate>{item.date}</TimelineDate>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                <CheckIcon className="size-4 group-not-data-completed/timeline-item:hidden" />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>{item.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    )
  },
}

// --- Git activity timeline with custom icons (c-timeline-4) ---
export const GitActivity: Story = {
  render: () => {
    const gitActivity = [
      {
        id: 1,
        date: '15 minutes ago',
        title: 'Forked Repository',
        description: 'Forked the repository to create a new branch for development.',
        icon: <GitForkIcon className="size-4" />,
      },
      {
        id: 2,
        date: '10 minutes ago',
        title: 'Pull Request Submitted',
        description: 'Submitted PR #342 with new feature implementation.',
        icon: <GitPullRequestArrowIcon className="size-3.5" />,
      },
      {
        id: 3,
        date: '5 minutes ago',
        title: 'Comparing Branches',
        description: 'Received comments on PR. Minor adjustments needed.',
        icon: <GitCompareArrowsIcon className="size-3.5" />,
      },
      {
        id: 4,
        date: 'Just now',
        title: 'Merged Branch',
        description: 'Merged the feature branch into main. Ready for deployment.',
        icon: <GitMergeIcon className="size-3.5" />,
      },
    ]
    return (
      <Timeline defaultValue={3} className="w-full max-w-md">
        {gitActivity.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineTitle className="mt-0.5">{item.title}</TimelineTitle>
              <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                {item.icon}
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>
              {item.description}
              <TimelineDate className="mt-2 mb-0">{item.date}</TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    )
  },
}

// --- Alternating sides milestones (c-timeline-5) ---
export const AlternatingSides: Story = {
  render: () => {
    const milestones = [
      { id: 1, date: 'Jan 2024', title: 'Seed Funding' },
      { id: 2, date: 'Mar 2024', title: 'Product MVP' },
      { id: 3, date: 'May 2024', title: 'First Client' },
      { id: 4, date: 'Jul 2024', title: 'Series A' },
      { id: 5, date: 'Sep 2024', title: 'Global Expansion' },
    ]
    return (
      <Timeline defaultValue={3} className="w-full max-w-md">
        {milestones.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className={cn(
              'w-[calc(50%-1.5rem)] odd:ms-auto even:me-auto even:text-right even:group-data-[orientation=vertical]/timeline:ms-0 even:group-data-[orientation=vertical]/timeline:me-8',
              'even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:-right-6 even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:left-auto',
              'even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-indicator]:translate-x-1/2 even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:-right-6',
              'even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:left-auto even:group-data-[orientation=vertical]/timeline:**:data-[slot=timeline-separator]:translate-x-1/2',
            )}
          >
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineDate>{item.date}</TimelineDate>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
          </TimelineItem>
        ))}
      </Timeline>
    )
  },
}

// --- Horizontal timeline (c-timeline-8) ---
export const Horizontal: Story = {
  render: () => {
    const releaseCycle = [
      { id: 1, date: 'Week 1', title: 'Planning', description: 'Scope definition and resource planning.' },
      { id: 2, date: 'Week 2', title: 'Design', description: 'UI/UX design and prototyping.' },
      { id: 3, date: 'Week 4', title: 'Development', description: 'Core features implementation.' },
    ]
    return (
      <Timeline defaultValue={2} orientation="horizontal" className="w-full max-w-xl">
        {releaseCycle.map((item) => (
          <TimelineItem key={item.id} step={item.id}>
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineDate>{item.date}</TimelineDate>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>{item.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    )
  },
}

// --- Horizontal with leading labels (c-timeline-9) ---
export const HorizontalWithLeadingLabels: Story = {
  render: () => {
    const projectJourney = [
      { id: 1, date: 'Oct 2024', title: 'Kickoff', description: 'Defining project goals and core team selection.' },
      { id: 2, date: 'Nov 2024', title: 'Discovery', description: 'User research and requirements gathering phase.' },
      { id: 3, date: 'Dec 2024', title: 'Implementation', description: 'Core development and sprint execution.' },
    ]
    return (
      <Timeline defaultValue={2} orientation="horizontal" className="w-full max-w-xl">
        {projectJourney.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="group-data-[orientation=horizontal]/timeline:mt-0"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=horizontal]/timeline:top-8" />
              <TimelineDate className="mb-10">{item.date}</TimelineDate>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineIndicator className="group-data-[orientation=horizontal]/timeline:top-8" />
            </TimelineHeader>
            <TimelineContent>{item.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    )
  },
}

// --- Deployment log with badges (c-timeline-10) ---
export const DeploymentLog: Story = {
  render: () => {
    const deployments = [
      { id: 1, title: 'Production Deploy', date: '2 minutes ago', commit: 'a1b2c3d', branch: 'main', status: 'success' as const, duration: '42s' },
      { id: 2, title: 'Staging Deploy', date: '15 minutes ago', commit: 'e4f5g6h', branch: 'staging', status: 'success' as const, duration: '38s' },
      { id: 3, title: 'Preview Deploy', date: '1 hour ago', commit: 'i7j8k9l', branch: 'feat/auth', status: 'failed' as const, duration: '1m 12s' },
      { id: 4, title: 'Production Deploy', date: '3 hours ago', commit: 'm0n1o2p', branch: 'main', status: 'success' as const, duration: '45s' },
    ]
    return (
      <div className="w-full max-w-xs">
        <Timeline defaultValue={4}>
          {deployments.map((deploy) => (
            <TimelineItem
              key={deploy.id}
              step={deploy.id}
              className="group-data-[orientation=vertical]/timeline:ms-10"
            >
              <TimelineHeader>
                <TimelineSeparator className="bg-input! group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                <div className="flex items-center gap-2">
                  <TimelineTitle className="text-sm">{deploy.title}</TimelineTitle>
                  <Badge
                    variant={deploy.status === 'success' ? 'success-light' : 'destructive-light'}
                    size="sm"
                  >
                    {deploy.status}
                  </Badge>
                </div>
                <TimelineIndicator
                  className={cn(
                    'flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7',
                    deploy.status === 'success' ? 'bg-emerald-500 text-white' : 'bg-destructive text-white',
                  )}
                >
                  {deploy.status === 'success' ? (
                    <CheckIcon className="size-3.5" />
                  ) : (
                    <XIcon className="size-3.5" />
                  )}
                </TimelineIndicator>
              </TimelineHeader>
              <TimelineContent>
                <div className="text-muted-foreground flex items-center gap-3 text-xs">
                  <span className="font-mono">{deploy.commit}</span>
                  <span>&middot;</span>
                  <span>{deploy.branch}</span>
                  <span>&middot;</span>
                  <span>{deploy.duration}</span>
                </div>
                <TimelineDate className="mt-1 mb-0">{deploy.date}</TimelineDate>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    )
  },
}

// --- Activity feed with avatars (c-timeline-11) ---
export const ActivityFeed: Story = {
  render: () => {
    const activities = [
      { id: 1, user: 'Alex Johnson', initials: 'AJ', action: 'pushed 3 commits to', target: 'main', date: '5 minutes ago' },
      { id: 2, user: 'Sarah Chen', initials: 'SC', action: 'opened pull request', target: '#284 -- Add dark mode', date: '20 minutes ago' },
      { id: 3, user: 'David Kim', initials: 'DK', action: 'commented on', target: 'Issue #142', date: '1 hour ago' },
      { id: 4, user: 'Emma Wilson', initials: 'EW', action: 'deployed to', target: 'production', date: '2 hours ago' },
    ]
    return (
      <div className="w-full max-w-md">
        <Timeline defaultValue={4}>
          {activities.map((activity) => (
            <TimelineItem
              key={activity.id}
              step={activity.id}
              className="group-data-[orientation=vertical]/timeline:ms-10"
            >
              <TimelineHeader>
                <TimelineSeparator className="bg-input! group-data-[orientation=vertical]/timeline:top-2 group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-[calc(100%-2.5rem)] group-data-[orientation=vertical]/timeline:translate-y-7" />
                <TimelineIndicator className="size-8 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8">
                  <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full text-[10px] font-medium">
                    {activity.initials}
                  </div>
                </TimelineIndicator>
              </TimelineHeader>
              <TimelineContent>
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-muted-foreground">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <TimelineDate className="mt-0.5 mb-0">{activity.date}</TimelineDate>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    )
  },
}

// --- Compact horizontal milestones with badges (c-timeline-12) ---
export const HorizontalMilestones: Story = {
  render: () => {
    const releases = [
      { id: 1, version: 'v1.0', date: 'Jan 2025', title: 'Initial Release', status: 'released' as const },
      { id: 2, version: 'v1.1', date: 'Mar 2025', title: 'Bug Fixes', status: 'released' as const },
      { id: 3, version: 'v2.0', date: 'Jun 2025', title: 'Major Update', status: 'current' as const },
      { id: 4, version: 'v2.1', date: 'Sep 2025', title: 'Improvements', status: 'upcoming' as const },
    ]
    return (
      <Timeline defaultValue={3} orientation="horizontal" className="w-full max-w-xl">
        {releases.map((release) => (
          <TimelineItem key={release.id} step={release.id}>
            <TimelineHeader>
              <TimelineSeparator className="bg-input! group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:left-2.5 group-data-[orientation=horizontal]/timeline:w-[calc(100%-2.25rem)]" />
              <TimelineDate>{release.date}</TimelineDate>
              <TimelineTitle className="flex items-center gap-2">
                {release.version}
                {release.status === 'current' && (
                  <Badge variant="primary-light" size="sm">
                    Current
                  </Badge>
                )}
              </TimelineTitle>
              <TimelineIndicator
                className={cn(
                  'flex size-6 items-center justify-center border-none',
                  release.status === 'released' && 'bg-emerald-500 text-white',
                  release.status === 'current' && 'bg-primary text-primary-foreground',
                  release.status === 'upcoming' && 'bg-muted text-muted-foreground',
                )}
              >
                {release.status === 'released' && <CheckIcon className="size-3.5" />}
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="text-xs">{release.title}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    )
  },
}
