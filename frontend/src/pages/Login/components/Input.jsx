export function Input({ name, type = 'text' }) {
  return (
    <input
      type={type}
      name={name}
      id={crypto.randomUUID()}
      className="rounded-md border border-transparent bg-[#3c3e42] px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-emerald-400 focus:border-emerald-400 focus:bg-emerald-400/10"
      required
    />
  )
}
