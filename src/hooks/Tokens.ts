import { Currency, ETHER, Token, currencyEquals } from '@uniswap/sdk'
import { useMemo } from 'react'
import { useToken as useTokenNew, useTokens } from '../state/tokens/hooks'
import { Token as NewToken } from '../state/tokens/types'
import { tokenToCurrency } from '../state/tokens/utils'
import { useUserAddedTokens } from '../state/user/hooks'
import { isAddress } from '../utils'
import { useTokenContract } from './useContract'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'

import { useActiveWeb3React } from './index'

export function useAllTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const tokens = useTokens()

  return useMemo(() => {
    if (!chainId) return {}
    return (
      tokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: Token }>(
          (tokenMap, token) => {
            tokenMap[token.address] = tokenToCurrency(token) as Token
            return tokenMap
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          {}
        )
    )
  }, [chainId, tokens])
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency): boolean {
  const userAddedTokens = useUserAddedTokens()
  return !!userAddedTokens.find(token => currencyEquals(currency, token))
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveWeb3React()

  const address = isAddress(tokenAddress)
  const token = useTokenNew(address || null)

  return useMemo(() => {
    if (!token) return null
    if (!chainId || !address) return undefined
    return tokenToCurrency(token) as Token
  }, [address, chainId, token])
}

export function useCurrency(currencyId: string | undefined): Currency | null | undefined {
  const isETH = currencyId?.toUpperCase() === 'ETH'
  const token = useToken(isETH ? undefined : currencyId)
  return isETH ? ETHER : token
}

export function useAnyToken(tokenAddress?: string): NewToken | undefined | null {
  const { chainId } = useActiveWeb3React()

  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address ? address : undefined, false)

  const tokenName = useSingleCallResult(tokenContract, 'name', undefined, NEVER_RELOAD)
  const symbol = useSingleCallResult(tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return {
        type: 'erc20',
        chainId: chainId.toString(),
        protocol: null,
        name: tokenName.result?.[0] || 'Unknown Token',
        symbol: symbol.result?.[0] || 'UNKNOWN',
        address,
        decimals: decimals.result[0]
      }
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    tokenName.loading,
    tokenName.result
  ])
}
