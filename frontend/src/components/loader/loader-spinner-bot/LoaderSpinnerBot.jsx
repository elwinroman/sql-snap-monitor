import './loader-spinner-bot.css'

export function LoaderSpinnerBot({ className, ...props }) {
  const sizeDefault = 'w-[38px] h-[38px]'

  return (
    <div className={`${sizeDefault} ${className}`} {...props}>
      <span className="loader-spinner-bot"></span>
    </div>
  )
}
