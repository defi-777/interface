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
    name: 'Uniswap Swap',
    description: 'Swap for other tokens',
    supportsToken: () => true
  },
  {
    id: 'uniswap-pool',
    name: 'Uniswap Pool',
    description: 'Provide liquidity & earn trading fees',
    supportsToken: () => true
  },
  {
    id: 'aave',
    name: 'Aave Deposit',
    description: 'Lend your tokens and earn interest',
    supportsToken: () => true
  },
  {
    id: 'balancer-pool',
    name: 'Balancer Pools',
    description: 'Deposit tokens into auto-rebalancing pools',
    supportsToken: () => true
  },
  {
    id: 'curve',
    name: 'Aave Deposit',
    description: 'Provide liquidity & earn fees without impermanent loss',
    supportsToken: () => true
  },
  {
    id: 'yearn',
    name: 'yEarn Vault',
    description: 'Auto-farm your tokens',
    supportsToken: () => true
  },
  {
    id: 'unwrap',
    name: 'Unwrap',
    description: 'Convert to ERC-20 token',
    supportsToken: () => true
  },
]

export default actions
