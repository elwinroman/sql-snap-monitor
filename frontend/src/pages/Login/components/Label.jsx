export function Label({ text }) {
  return (
    <label htmlFor="" className="flex gap-1">
      <span className="text-sm font-medium">{text}</span>
      <span className="text-rose-600">*</span>
    </label>
  )
}
