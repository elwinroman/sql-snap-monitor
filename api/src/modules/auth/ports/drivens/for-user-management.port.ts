export interface ForUserManagementPort {
  getUser(hashId: string): void
  createUser(): void
}
