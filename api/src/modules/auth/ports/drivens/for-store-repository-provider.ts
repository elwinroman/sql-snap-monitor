export interface StoreInfo {
  name: string
  compatibility: number
  description: string | null
  server: string
}

export interface ForStoreRepositoryProvider {
  getDetails(): Promise<StoreInfo>
}
