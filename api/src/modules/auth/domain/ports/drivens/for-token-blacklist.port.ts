export interface ForTokenBlacklistPort {
  isBlacklisted(jti: string): Promise<boolean>
}
