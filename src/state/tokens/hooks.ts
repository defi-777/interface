import { useDispatch, useSelector } from 'react-redux'
import { Token } from './types'
import { AppDispatch, AppState } from '../index'
import { tokenFetchStarted, tokenFetchCompleted, tokenFetchFailed } from './actions'
import { useActiveWeb3React } from '../../hooks'

async function fetchTokens(network: string) {
  const request = await fetch(`https://defi777-api.vercel.app/api/${network}/tokens.json`)
  const result = await request.json()
  return result
}

const chains: { [chainId: number]: string } = {
  1: 'mainnet',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan'
}

interface TokenFilter {
  yieldAdapter?: boolean
  type?: string
}

export function useTokens({ yieldAdapter, type }: TokenFilter = {}): Token[] {
  const tokens = useSelector<AppState, AppState['tokens']>(state => state.tokens)
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  if (!tokens.fetched && !tokens.updating) {
    dispatch(tokenFetchStarted())
    fetchTokens(chains[chainId as number])
      .then((tokens: any) => dispatch(tokenFetchCompleted(tokens)))
      .catch((e: any) => {
        console.warn(`Fetch tokens failed: ${e.message}`)
        dispatch(tokenFetchFailed())
      })
  }
  return tokens.addresses
    .map((address: string) => tokens.byAddress[address]!)
    .filter((token: Token) => {
      if (yieldAdapter !== undefined && !!token.yieldAdapter !== yieldAdapter) {
        return false
      }
      if (type !== undefined && token.type !== type) {
        return false
      }
      return true
    })
}

export function useToken(address?: string | null): Token | null {
  const tokens = useSelector<AppState, AppState['tokens']>(state => state.tokens)
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  if (!tokens.fetched && !tokens.updating) {
    dispatch(tokenFetchStarted())
    fetchTokens(chains[chainId as number])
      .then((tokens: any) => dispatch(tokenFetchCompleted(tokens)))
      .catch((e: any) => {
        console.warn(`Fetch tokens failed: ${e.message}`)
        dispatch(tokenFetchFailed())
      })
  }

  if (!address) {
    return null
  }

  return tokens.byAddress[address] || null
}
