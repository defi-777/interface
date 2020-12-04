import { useAddressBookContract } from './useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

export function useWrapperAddress(token: string) {
  const addressBook = useAddressBookContract()

  const wrapperAddress = useSingleCallResult(addressBook, 'calculateWrapperAddress', [token])

  return wrapperAddress.result?.[0] ?? null
}
