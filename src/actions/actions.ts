import { Currency } from '@uniswap/sdk'

export interface Action {
  id: string
  name: string
  description: string
  supportsToken: (token: Currency) => boolean
}

const actions: Action[] = [
  {
    id: 'uniswap',
    name: 'Uniswap Trade',
    description: 'Swap for other tokens',
    supportsToken: (token: any) => token?.tokenInfo?.tags?.indexOf('erc777') !== -1 || token.symbol === 'ETH'
  },
  {
    id: 'uniswap-pool',
    name: 'Uniswap Pool',
    description: 'Provide liquidity & earn trading fees',
    supportsToken: (token: any) => token?.tokenInfo?.tags?.indexOf('erc777') !== -1 || token.symbol === 'ETH'
  },
  {
    id: 'aave',
    name: 'Aave Deposit',
    description: 'Lend your tokens and earn interest',
    supportsToken: (token: any) => token?.tokenInfo?.tags?.indexOf('erc777') !== -1 || token.symbol === 'ETH'
  },
  {
    id: 'balancer-pool',
    name: 'Balancer Pools',
    description: 'Deposit tokens into auto-rebalancing pools',
    supportsToken: (token: any) =>
      token.symbol === 'ETH' ||
      (token?.tokenInfo?.tags?.indexOf('balancer') === -1 && token?.tokenInfo?.tags?.indexOf('erc777') !== -1)
  },
  {
    id: 'balancer-exit',
    name: 'Balancer Pools',
    description: 'Withdraw tokens from a balancer pool',
    supportsToken: (token: any) => token.tokenInfo && token.tokenInfo.tags.indexOf('balancer') !== -1
  },
  {
    id: 'curve',
    name: 'Curve Pools',
    description: 'Provide liquidity & earn fees without impermanent loss',
    supportsToken: (token: any) => ['DAI777', 'USDC777', 'USDT777'].indexOf(token.symbol) !== -1
  },
  {
    id: 'yearn',
    name: 'yEarn Vault',
    description: 'Auto-farm your tokens',
    supportsToken: (token: any) => ['DAI777', 'USDC777', 'USDT777', 'YFI777'].indexOf(token.symbol) !== -1
  },
  {
    id: 'unwrap',
    name: 'Unwrap',
    description: 'Convert to ERC-20 token',
    supportsToken: (token: any) => token.tokenInfo && token.tokenInfo.tags.indexOf('erc777') !== -1
  }
]

export default actions
