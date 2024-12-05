import { v4 as uuidv4 } from 'uuid'

export function Input({ name, type = 'text', placeholder }) {
  return (
    <input
      type={type}
      name={name}
      id={uuidv4()}
      className="h-10 w-full rounded-sm border border-border bg-[#292b2c] px-3 text-sm outline-none transition-colors duration-300 placeholder:text-[14px] placeholder:opacity-60 hover:border-emerald-800 focus:border-emerald-800"
      placeholder={placeholder}
      required
    />
  )
}
