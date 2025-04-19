import { v4 as uuidv4 } from 'uuid'

import { Input as InputGen } from '@/components/ui/input'

export function Input({ name, type = 'text', placeholder, defaultValue }) {
  return <InputGen type={type} name={name} id={uuidv4()} placeholder={placeholder} defaultValue={defaultValue} required />
}
