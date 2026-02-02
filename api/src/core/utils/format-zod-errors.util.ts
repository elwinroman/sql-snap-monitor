import { ZodIssue } from 'zod'

export function formatZodErrors(errors: ZodIssue[]): string[] {
  return errors.map(err => {
    const path = err.path.join('.')
    return `${path}: ${err.message}`
  })
}
