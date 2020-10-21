import React from 'react'
import { useAllTokens } from '../../hooks/Tokens'
import { Currency, ETHER, Token } from '@uniswap/sdk'
import AssetRow from './AssetRow'

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

export default function AssetList({ getLink }: { getLink: (currency: Currency) => string }) {
  const allTokens = useAllTokens()
  const tokens = [Currency.ETHER, ...Object.values(allTokens)]

  return (
    <div>
      {tokens.map(token => (
        <AssetRow key={currencyKey(token)} currency={token} getLink={getLink} />
      ))}
    </div>
  )
}
