export type TokenProtocol = string | null

export interface Token {
  readonly type: 'erc20' | 'erc777' | 'eth' | 'yield'
  readonly chainId: string
  readonly name: string
  readonly symbol: string
  readonly address: string
  readonly decimals: number
  readonly yieldAdapter?: boolean
  readonly protocol: TokenProtocol
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
  protocol: null,
  decimals: 18
}

export interface TokenState {
  readonly byAddress: { readonly [id: string]: Token }
  readonly addresses: string[]
  readonly updating: boolean
  readonly fetched: boolean
}
