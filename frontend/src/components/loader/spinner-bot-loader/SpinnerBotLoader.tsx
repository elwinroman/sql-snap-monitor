import './spinner-bot-loader.css'

interface SpinnerBotLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
}

export function SpinnerBotLoader({ className = '', size = 24, ...props }: SpinnerBotLoaderProps) {
  return (
    <div className={className} {...props} style={{ width: size, height: size }}>
      <span className="loader-spinner-bot h-full w-full"></span>
    </div>
  )
}
