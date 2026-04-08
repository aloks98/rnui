import type { Meta, StoryObj } from '@storybook/react'
import { useFileUpload, formatBytes, cn, Button } from '@e412/rnui-react'

const meta = {
  title: 'Hooks/useFileUpload',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SingleFile: Story = {
  render: function SingleFileUpload() {
    const [state, actions] = useFileUpload({ multiple: false })

    return (
      <div className="flex w-full max-w-md flex-col gap-4">
        <div
          onDragEnter={actions.handleDragEnter}
          onDragLeave={actions.handleDragLeave}
          onDragOver={actions.handleDragOver}
          onDrop={actions.handleDrop}
          onClick={actions.openFileDialog}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors",
            state.isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          )}
        >
          <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
          <input {...actions.getInputProps({ className: "hidden" })} />
        </div>

        {state.files.length > 0 && (
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">{state.files[0].file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(state.files[0].file.size)}</p>
          </div>
        )}

        {state.errors.length > 0 && (
          <p className="text-sm text-destructive">{state.errors[0]}</p>
        )}
      </div>
    )
  },
}

export const MultipleFiles: Story = {
  render: function MultipleFilesUpload() {
    const [state, actions] = useFileUpload({ multiple: true, maxFiles: 5 })

    return (
      <div className="flex w-full max-w-md flex-col gap-4">
        <div
          onDragEnter={actions.handleDragEnter}
          onDragLeave={actions.handleDragLeave}
          onDragOver={actions.handleDragOver}
          onDrop={actions.handleDrop}
          onClick={actions.openFileDialog}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors",
            state.isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          )}
        >
          <p className="text-sm text-muted-foreground">Drag & drop or click to upload (max 5 files)</p>
          <input {...actions.getInputProps({ className: "hidden" })} />
        </div>

        {state.files.length > 0 && (
          <ul className="flex flex-col gap-2">
            {state.files.map((file) => (
              <li key={file.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">{file.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(file.file.size)}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => actions.removeFile(file.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}

        {state.errors.length > 0 && (
          <p className="text-sm text-destructive">{state.errors[0]}</p>
        )}
      </div>
    )
  },
}

export const ImageOnly: Story = {
  render: function ImageOnlyUpload() {
    const [state, actions] = useFileUpload({
      multiple: true,
      accept: 'image/*',
      maxSize: 5 * 1024 * 1024,
    })

    return (
      <div className="flex w-full max-w-md flex-col gap-4">
        <div
          onDragEnter={actions.handleDragEnter}
          onDragLeave={actions.handleDragLeave}
          onDragOver={actions.handleDragOver}
          onDrop={actions.handleDrop}
          onClick={actions.openFileDialog}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors",
            state.isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          )}
        >
          <p className="text-sm text-muted-foreground">Drag & drop or click to upload images (max 5MB)</p>
          <input {...actions.getInputProps({ className: "hidden" })} />
        </div>

        {state.files.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {state.files.map((file) => (
              <div key={file.id} className="relative overflow-hidden rounded-md border">
                {file.preview && (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="aspect-square w-full object-cover"
                  />
                )}
                <div className="p-2">
                  <p className="truncate text-xs font-medium">{file.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(file.file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {state.errors.length > 0 && (
          <p className="text-sm text-destructive">{state.errors[0]}</p>
        )}
      </div>
    )
  },
}
