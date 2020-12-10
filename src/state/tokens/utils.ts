import { Currency, Token as UniToken, ETHER, ChainId } from '@uniswap/sdk'
import { Token } from './types'

export function tokenToCurrency(token: Token): Currency {
  if (token.type === 'eth') {
    return ETHER
  }
  return new UniToken(parseInt(token.chainId) as ChainId, token.address, token.decimals, token.symbol, token.name)
}
