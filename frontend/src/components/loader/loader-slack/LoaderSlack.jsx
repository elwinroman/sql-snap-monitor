import './loader-slack.css'

export function LoaderSlack({ className, ...props }) {
  return (
    <div className={` ${className} relative`} {...props}>
      <span className="border loader-slack"></span>
    </div>
  )
}
