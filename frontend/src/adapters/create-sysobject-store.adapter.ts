import { FullSysObject } from '@/models/sysobject'

export const createSysObjectStoreAdapter = (sysobject: FullSysObject): FullSysObject => {
  return { ...sysobject }
}
