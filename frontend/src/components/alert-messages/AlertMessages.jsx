import { AlertCircle as AlertCircleIcon } from '@/icons/alert-circle'

export function AlertMessages({ message, type }) {
  const alert = {}
  const log = typeof message === 'string' ? JSON.parse(message) : message

  if (type === 'error') {
    alert.className = 'border-[#f53e7b59] bg-[#592e41]'
    alert.icon = <AlertCircleIcon />
  }

  return (
    <div
      className={`flex gap-2 rounded-md border px-4 py-2 ${alert.className}`}
    >
      <i className="pt-0.5">{alert.icon}</i>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-white">{log.error.message}</p>
        {log.originalError && (
          <p className="text-sm text-white">{log.originalError.message}</p>
        )}
      </div>
    </div>
  )
}
