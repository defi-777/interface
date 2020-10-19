import React from 'react'
import { useAllTokens } from '../../hooks/Tokens'
import { Currency, ETHER, Token } from '@uniswap/sdk'
import AssetRow from './AssetRow'

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

export default function AssetList() {
  const allTokens = useAllTokens()
  const tokens = [Currency.ETHER, ...Object.values(allTokens)]

  return (
    <div>
      {tokens.map(token => {
        const handleSelect = () => null
        return <AssetRow key={currencyKey(token)} currency={token} onSelect={handleSelect} />
      })}
    </div>
  )
}
