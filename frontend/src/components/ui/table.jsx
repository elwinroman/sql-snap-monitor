import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

const Table = forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn('w-full table-auto caption-bottom border-0 text-sm', className)} {...props} />
  </div>
))
Table.displayName = 'Table'

const TableHeader = forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = forwardRef(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)} {...props} />
))
TableFooter.displayName = 'TableFooter'

const TableRow = forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn('hover:bg-actionHover data-[state=selected]:bg-actionHover border-b border-border transition-colors', className)}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'bg-background-neutral h-12 pl-4 text-left align-middle font-semibold text-secondary [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('border-0 py-4 pl-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
))
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
