import { InputWithIcon } from '@/components/ui/input-with-icon'

export function Header() {
  const SearchIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
  )
  return (
    <header className="flex w-full flex-[0_0_100px] flex-row items-center gap-8">
      <div className="grow">1</div>
      <div>
        <InputWithIcon startIcon={<SearchIcon />} placeholder="Search" />
      </div>
      <div>aroman</div>
      <div>icons</div>
    </header>
  )
}
