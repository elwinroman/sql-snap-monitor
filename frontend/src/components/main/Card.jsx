export function Card({ classname, children }) {
  return <div className={`bg-card shadow-custom-card flex flex-col gap-4 rounded-md px-6 py-5 ${classname}`}>{children}</div>
}
