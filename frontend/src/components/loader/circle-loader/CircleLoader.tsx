import './circle-loader.css'

import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
  size?: number
  className?: string
  color?: React.CSSProperties['backgroundColor']
}

const bars = Array(12).fill(0)

export const CircleLoader = ({ visible, size = 24, className = '', color = 'black' }: Props) => {
  return (
    <div className={cn('circle-loading-wrapper circle-loader', className)} style={{ width: size, height: size }} data-visible={visible}>
      <div className="circle-spinner" style={{ width: size, height: size }}>
        {bars.map((_, i) => (
          <div className="circle-loading-bar" key={`spinner-bar-${i}`} style={{ backgroundColor: color }} />
        ))}
      </div>
    </div>
  )
}
