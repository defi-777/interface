import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Currency, Token, ETHER } from '@uniswap/sdk'
import { AutoColumn } from '../../../components/Column'
import AppBody from '../../AppBody'
import { useCurrency } from '../../../hooks/Tokens'
import { Wrapper } from '../../../components/swap/styleds'
import AssetList from '../../../components/AssetList'

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

export default function UniswapOutputSelection({
  match: {
    params: { currencyIdA }
  }
}: RouteComponentProps<{ currencyIdA: string }>) {
  const token = useCurrency(currencyIdA)

  if (!token) {
    return (
      <AppBody>
        <Wrapper>Loading...</Wrapper>
      </AppBody>
    )
  }

  return (
    <AppBody>
      <pre>{JSON.stringify(token)}</pre>
      <Wrapper>
        <AutoColumn gap={'md'}>
          <AssetList getLink={(currency: Currency) => `/uniswap/${currencyIdA}/${currencyKey(currency)}`} />
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}
