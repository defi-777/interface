export interface Token {
  readonly type: 'erc20' | 'erc777' | 'eth'
  readonly chainId: string
  readonly name: string
  readonly symbol: string
  readonly address: string
  readonly decimals: number
  readonly yieldAdapter?: boolean
  readonly protocol?: string
  readonly underlyingAddress?: string
  readonly yieldWrappers?: {
    readonly name: string
    readonly symbol: string
    readonly address: string
    readonly yieldAdapter: string
    readonly underlyingAddress: string
  }[]
}

export const Ether: Token = {
  chainId: '1',
  type: 'eth',
  name: 'Ether',
  symbol: 'ETH',
  address: '0x0000000000000000000000000000000000000000',
  decimals: 18
}

export interface TokenState {
  readonly byAddress: { readonly [id: string]: Token }
  readonly addresses: string[]
  readonly updating: boolean
  readonly fetched: boolean
}
