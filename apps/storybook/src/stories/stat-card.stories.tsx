import type { Meta, StoryObj } from '@storybook/react'
import { StatCard } from '@e412/rnui-react'
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'

const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    value: {
      control: 'text',
      description: 'Main value to display',
    },
    description: {
      control: 'text',
      description: 'Description text below the value',
    },
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231.89',
    description: 'Monthly revenue',
  },
}

export const WithTrend: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231.89',
    description: '+20.1% from last month',
    trend: { value: 20.1, isPositive: true },
  },
}

export const NegativeTrend: Story = {
  args: {
    title: 'Bounce Rate',
    value: '42.5%',
    description: 'Increased from last week',
    trend: { value: 5.2, isPositive: false },
  },
}

export const WithIcon: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231.89',
    description: '+20.1% from last month',
    icon: <DollarSign />,
    trend: { value: 20.1, isPositive: true },
  },
}

export const AllCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value="$45,231.89"
        icon={<DollarSign />}
        trend={{ value: 20.1, isPositive: true }}
        description="+20.1% from last month"
      />
      <StatCard
        title="Subscribers"
        value="+2,350"
        icon={<Users />}
        trend={{ value: 180.1, isPositive: true }}
        description="+180.1% from last month"
      />
      <StatCard
        title="Sales"
        value="+12,234"
        icon={<ShoppingCart />}
        trend={{ value: 19, isPositive: true }}
        description="+19% from last month"
      />
      <StatCard
        title="Active Now"
        value="+573"
        icon={<TrendingUp />}
        trend={{ value: 4.3, isPositive: false }}
        description="-4.3% from last hour"
      />
    </div>
  ),
}
