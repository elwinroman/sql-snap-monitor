import { v4 as uuidv4 } from 'uuid'

import { Input as InputGen } from '@/components/ui'

export function Input({
  name,
  placeholder,
  defaultValue,
  className,
}: {
  name: string
  placeholder: string
  defaultValue?: string
  className?: string
}) {
  return <InputGen name={name} id={uuidv4()} placeholder={placeholder} defaultValue={defaultValue} className={className} required />
}
