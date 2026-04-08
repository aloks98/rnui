import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Tree,
  TreeItem,
  TreeItemLabel,
  Checkbox,
} from '@e412/rnui-react'
import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core'
import { useTree } from '@headless-tree/react'
import {
  FolderIcon,
  FolderOpenIcon,
  FileIcon,
  FileCodeIcon,
  FileTextIcon,
  PaletteIcon,
  BracesIcon,
} from 'lucide-react'

const meta = {
  title: 'Components/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    indent: {
      control: { type: 'number', min: 8, max: 40 },
      description: 'Indentation in pixels per level',
    },
    toggleIconType: {
      control: 'select',
      options: ['chevron', 'plus-minus'],
      description: 'Type of toggle icon',
    },
  },
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

// --- Shared CRM data ---
interface Item {
  name: string
  children?: string[]
}

const crmItems: Record<string, Item> = {
  crm: {
    name: 'CRM',
    children: ['leads', 'accounts', 'activities', 'support'],
  },
  leads: {
    name: 'Leads',
    children: ['new-lead', 'contacted-lead', 'qualified-lead'],
  },
  'new-lead': { name: 'New Lead' },
  'contacted-lead': { name: 'Contacted Lead' },
  'qualified-lead': { name: 'Qualified Lead' },
  accounts: {
    name: 'Accounts',
    children: ['acme-corp', 'globex-inc'],
  },
  'acme-corp': {
    name: 'Acme Corp',
    children: ['acme-contacts', 'acme-opportunities'],
  },
  'acme-contacts': {
    name: 'Contacts',
    children: ['john-smith', 'jane-doe'],
  },
  'john-smith': { name: 'John Smith' },
  'jane-doe': { name: 'Jane Doe' },
  'acme-opportunities': {
    name: 'Opportunities',
    children: ['website-redesign', 'annual-maintenance'],
  },
  'website-redesign': { name: 'Website Redesign' },
  'annual-maintenance': { name: 'Annual Maintenance' },
  'globex-inc': {
    name: 'Globex Inc',
    children: ['globex-contacts', 'globex-opportunities'],
  },
  'globex-contacts': {
    name: 'Contacts',
    children: ['alice-johnson'],
  },
  'alice-johnson': { name: 'Alice Johnson' },
  'globex-opportunities': {
    name: 'Opportunities',
    children: ['cloud-migration'],
  },
  'cloud-migration': { name: 'Cloud Migration' },
  activities: {
    name: 'Activities',
    children: ['calls', 'meetings', 'emails'],
  },
  calls: { name: 'Calls' },
  meetings: { name: 'Meetings' },
  emails: { name: 'Emails' },
  support: {
    name: 'Support',
    children: ['open-tickets', 'closed-tickets'],
  },
  'open-tickets': { name: 'Open Tickets' },
  'closed-tickets': { name: 'Closed Tickets' },
}

// --- Basic tree (c-tree-1) ---
export const Basic: Story = {
  render: () => {
    const indent = 20
    const tree = useTree<Item>({
      initialState: {
        expandedItems: ['leads', 'accounts', 'activities'],
      },
      indent,
      rootItemId: 'crm',
      getItemName: (item) => item.getItemData().name,
      isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
      dataLoader: {
        getItem: (itemId) => crmItems[itemId],
        getChildren: (itemId) => crmItems[itemId].children ?? [],
      },
      features: [syncDataLoaderFeature, hotkeysCoreFeature],
    })

    return (
      <div className="w-full max-w-xs">
        <Tree indent={indent} tree={tree}>
          {tree.getItems().map((item) => (
            <TreeItem key={item.getId()} item={item}>
              <TreeItemLabel />
            </TreeItem>
          ))}
        </Tree>
      </div>
    )
  },
}

// --- Tree with indented lines (c-tree-2) ---
export const WithIndentedLines: Story = {
  render: () => {
    const indent = 20
    const tree = useTree<Item>({
      initialState: {
        expandedItems: ['leads', 'accounts', 'activities'],
      },
      indent,
      rootItemId: 'crm',
      getItemName: (item) => item.getItemData().name,
      isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
      dataLoader: {
        getItem: (itemId) => crmItems[itemId],
        getChildren: (itemId) => crmItems[itemId].children ?? [],
      },
      features: [syncDataLoaderFeature, hotkeysCoreFeature],
    })

    return (
      <div className="w-full max-w-xs">
        <Tree
          className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
          indent={indent}
          tree={tree}
        >
          {tree.getItems().map((item) => (
            <TreeItem key={item.getId()} item={item}>
              <TreeItemLabel />
            </TreeItem>
          ))}
        </Tree>
      </div>
    )
  },
}

// --- Tree with folder/file icons (c-tree-3) ---
export const WithIcons: Story = {
  render: () => {
    const indent = 20
    const tree = useTree<Item>({
      initialState: {
        expandedItems: ['leads', 'accounts', 'activities'],
      },
      indent,
      rootItemId: 'crm',
      getItemName: (item) => item.getItemData().name,
      isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
      dataLoader: {
        getItem: (itemId) => crmItems[itemId],
        getChildren: (itemId) => crmItems[itemId].children ?? [],
      },
      features: [syncDataLoaderFeature, hotkeysCoreFeature],
    })

    return (
      <div className="w-full max-w-xs">
        <Tree
          className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
          indent={indent}
          tree={tree}
        >
          {tree.getItems().map((item) => (
            <TreeItem key={item.getId()} item={item}>
              <TreeItemLabel className="before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10">
                <span className="flex items-center gap-2">
                  {item.isFolder() ? (
                    item.isExpanded() ? (
                      <FolderOpenIcon className="text-muted-foreground pointer-events-none size-4" />
                    ) : (
                      <FolderIcon className="text-muted-foreground pointer-events-none size-4" />
                    )
                  ) : (
                    <FileIcon className="text-muted-foreground pointer-events-none size-4" />
                  )}
                  {item.getItemName()}
                </span>
              </TreeItemLabel>
            </TreeItem>
          ))}
        </Tree>
      </div>
    )
  },
}

// --- File explorer tree with type icons (c-tree-5) ---
export const FileExplorer: Story = {
  render: () => {
    interface FileItem {
      name: string
      children?: string[]
      type?: 'folder' | 'ts' | 'tsx' | 'css' | 'json' | 'md' | 'config'
    }

    const fileItems: Record<string, FileItem> = {
      root: {
        name: 'my-project',
        children: ['src', 'public', 'package-json', 'readme', 'tsconfig'],
      },
      src: { name: 'src', children: ['app', 'components', 'lib', 'globals-css'], type: 'folder' },
      app: { name: 'app', children: ['page-tsx', 'layout-tsx', 'loading-tsx'], type: 'folder' },
      'page-tsx': { name: 'page.tsx', type: 'tsx' },
      'layout-tsx': { name: 'layout.tsx', type: 'tsx' },
      'loading-tsx': { name: 'loading.tsx', type: 'tsx' },
      components: { name: 'components', children: ['button-tsx', 'card-tsx', 'dialog-tsx'], type: 'folder' },
      'button-tsx': { name: 'button.tsx', type: 'tsx' },
      'card-tsx': { name: 'card.tsx', type: 'tsx' },
      'dialog-tsx': { name: 'dialog.tsx', type: 'tsx' },
      lib: { name: 'lib', children: ['utils-ts', 'api-ts'], type: 'folder' },
      'utils-ts': { name: 'utils.ts', type: 'ts' },
      'api-ts': { name: 'api.ts', type: 'ts' },
      'globals-css': { name: 'globals.css', type: 'css' },
      public: { name: 'public', children: ['favicon'], type: 'folder' },
      favicon: { name: 'favicon.ico', type: 'config' },
      'package-json': { name: 'package.json', type: 'json' },
      readme: { name: 'README.md', type: 'md' },
      tsconfig: { name: 'tsconfig.json', type: 'json' },
    }

    const getFileIcon = (type?: string, isExpanded?: boolean) => {
      if (!type || type === 'folder') {
        return isExpanded ? (
          <FolderOpenIcon className="pointer-events-none size-4 text-amber-500" />
        ) : (
          <FolderIcon className="pointer-events-none size-4 text-amber-500" />
        )
      }
      if (type === 'tsx' || type === 'ts') {
        return <FileCodeIcon className="pointer-events-none size-4 text-blue-500" />
      }
      if (type === 'css') {
        return <PaletteIcon className="pointer-events-none size-4 text-purple-500" />
      }
      if (type === 'json') {
        return <BracesIcon className="pointer-events-none size-4 text-yellow-500" />
      }
      if (type === 'md') {
        return <FileTextIcon className="text-muted-foreground pointer-events-none size-4" />
      }
      return <FileIcon className="text-muted-foreground pointer-events-none size-4" />
    }

    const indent = 20
    const tree = useTree<FileItem>({
      initialState: {
        expandedItems: ['src', 'app', 'components'],
      },
      indent,
      rootItemId: 'root',
      getItemName: (item) => item.getItemData().name,
      isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
      dataLoader: {
        getItem: (itemId) => fileItems[itemId],
        getChildren: (itemId) => fileItems[itemId].children ?? [],
      },
      features: [syncDataLoaderFeature, hotkeysCoreFeature],
    })

    return (
      <div className="w-full max-w-xs">
        <Tree indent={indent} tree={tree}>
          {tree.getItems().map((item) => (
            <TreeItem key={item.getId()} item={item}>
              <TreeItemLabel className="before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10">
                <span className="flex items-center gap-2">
                  {getFileIcon(item.getItemData().type, item.isExpanded())}
                  {item.getItemName()}
                </span>
              </TreeItemLabel>
            </TreeItem>
          ))}
        </Tree>
      </div>
    )
  },
}

// --- Permissions tree with checkboxes (c-tree-7) ---
export const WithCheckboxes: Story = {
  render: () => {
    interface PermissionItem {
      name: string
      children?: string[]
    }

    const permItems: Record<string, PermissionItem> = {
      permissions: {
        name: 'All Permissions',
        children: ['users', 'content', 'billing', 'api'],
      },
      users: {
        name: 'User Management',
        children: ['users-view', 'users-create', 'users-edit', 'users-delete'],
      },
      'users-view': { name: 'View users' },
      'users-create': { name: 'Create users' },
      'users-edit': { name: 'Edit users' },
      'users-delete': { name: 'Delete users' },
      content: {
        name: 'Content Management',
        children: ['content-view', 'content-publish', 'content-delete'],
      },
      'content-view': { name: 'View content' },
      'content-publish': { name: 'Publish content' },
      'content-delete': { name: 'Delete content' },
      billing: { name: 'Billing', children: ['billing-view', 'billing-manage'] },
      'billing-view': { name: 'View invoices' },
      'billing-manage': { name: 'Manage subscriptions' },
      api: { name: 'API Access', children: ['api-read', 'api-write'] },
      'api-read': { name: 'Read access' },
      'api-write': { name: 'Write access' },
    }

    const [checked, setChecked] = useState<Set<string>>(
      new Set(['users-view', 'content-view', 'content-publish', 'billing-view', 'api-read']),
    )

    const togglePermission = (id: string) => {
      setChecked((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }

    const indent = 24
    const tree = useTree<PermissionItem>({
      initialState: {
        expandedItems: ['users', 'content'],
      },
      indent,
      rootItemId: 'permissions',
      getItemName: (item) => item.getItemData().name,
      isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
      dataLoader: {
        getItem: (itemId) => permItems[itemId],
        getChildren: (itemId) => permItems[itemId].children ?? [],
      },
      features: [syncDataLoaderFeature, hotkeysCoreFeature],
    })

    return (
      <div className="w-full max-w-xs">
        <Tree indent={indent} tree={tree} toggleIconType="plus-minus">
          {tree.getItems().map((item) => {
            const id = item.getId()
            const isLeaf = !item.isFolder()

            return (
              <TreeItem key={id} item={item}>
                <TreeItemLabel className="not-in-data-[folder=true]:ps-5">
                  <span className="flex items-center gap-2">
                    {isLeaf && (
                      <Checkbox
                        checked={checked.has(id)}
                        onCheckedChange={() => togglePermission(id)}
                        className="size-3.5"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      />
                    )}
                    {item.getItemName()}
                  </span>
                </TreeItemLabel>
              </TreeItem>
            )
          })}
        </Tree>
      </div>
    )
  },
}
