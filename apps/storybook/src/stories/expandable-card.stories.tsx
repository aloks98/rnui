import type { Meta, StoryObj } from '@storybook/react'
import { ExpandableCard, type CardItem } from '@e412/rnui-react'
import { DatabaseIcon, CloudIcon, ShieldIcon, ZapIcon } from 'lucide-react'

const meta = {
  title: 'Components/ExpandableCard',
  component: ExpandableCard,
} satisfies Meta<typeof ExpandableCard>

export default meta
type Story = StoryObj<typeof meta>

const items: CardItem[] = [
  {
    id: '1',
    title: 'PostgreSQL',
    subtitle: 'Database',
    icon: <DatabaseIcon className="size-8 text-blue-500" />,
    description: 'Relational database',
    details: 'PostgreSQL is a powerful, open-source object-relational database system with a strong reputation for reliability, feature robustness, and performance. It supports advanced data types and performance optimizations.',
    metadata: 'v16.2 • 3 replicas • us-east-1',
  },
  {
    id: '2',
    title: 'Redis',
    subtitle: 'Cache',
    icon: <ZapIcon className="size-8 text-red-500" />,
    description: 'In-memory store',
    details: 'Redis is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine. It supports strings, hashes, lists, sets, sorted sets, and more.',
    metadata: 'v7.2 • 256MB • 99.99% uptime',
  },
  {
    id: '3',
    title: 'Cloudflare',
    subtitle: 'CDN',
    icon: <CloudIcon className="size-8 text-orange-500" />,
    description: 'Content delivery',
    details: 'Cloudflare provides content delivery network services, cloud cybersecurity, DDoS mitigation, and ICANN-accredited domain registration services. It acts as a reverse proxy between a visitor and the customer hosting provider.',
    metadata: 'Enterprise plan • 250+ PoPs',
  },
  {
    id: '4',
    title: 'Vault',
    subtitle: 'Security',
    icon: <ShieldIcon className="size-8 text-green-500" />,
    description: 'Secret management',
    details: 'HashiCorp Vault secures, stores, and tightly controls access to tokens, passwords, certificates, API keys, and other secrets. It handles leasing, key revocation, key rolling, and auditing.',
    metadata: 'v1.15 • 42 secrets • auto-rotate',
  },
]

export const Default: Story = {
  args: {
    items,
  },
}

export const TwoItems: Story = {
  args: {
    items: items.slice(0, 2),
  },
}
