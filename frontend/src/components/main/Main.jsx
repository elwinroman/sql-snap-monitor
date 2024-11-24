export function Main({ className, children }) {
  return <section className={`flex w-full flex-[1_0_auto] flex-col gap-5 py-4 ${className}`}>{children}</section>
}
