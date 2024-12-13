export interface Pagination {
  start: number
  limit: number
  total: number
}

export interface PaginationInput {
  start: number | undefined
  limit: number | undefined
}
