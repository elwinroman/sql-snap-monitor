import { Maximize as MaximizeIcon } from '@/icons/maximize'
import { Minimize as MinimizeIcon } from '@/icons/minimize'

export function MaxMin({ maximize, toggleMaximize }) {
  return (
    <button className="" onClick={toggleMaximize}>
      {maximize ? (
        <i className="text-white">
          <MinimizeIcon width={24} height={24} />
        </i>
      ) : (
        <i className="text-white">
          <MaximizeIcon width={24} height={24} />
        </i>
      )}
    </button>
  )
}
