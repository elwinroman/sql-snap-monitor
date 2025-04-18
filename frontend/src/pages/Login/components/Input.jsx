import { v4 as uuidv4 } from 'uuid'

export function Input({ name, type = 'text', placeholder, defaultValue }) {
  return (
    <input
      type={type}
      name={name}
      id={uuidv4()}
      className="placeholder:text-muted h-10 w-full rounded-sm border border-gray-500/20 bg-transparent px-3 text-sm outline-hidden transition-colors duration-300 placeholder:text-[14px] placeholder:opacity-60 focus:border-transparent focus:outline-offset-0 focus:outline-white"
      placeholder={placeholder}
      defaultValue={defaultValue}
      required
    />
  )
}
