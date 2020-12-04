import { Currency, Token, ETHER } from '@uniswap/sdk'
import React from 'react'
import { AutoColumn } from '../../components/Column'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'

import AppBody from '../AppBody'
import AssetList from '../../components/AssetList'

const getTokenLink = (currency: Currency): string =>
  `/token/${currency instanceof Token ? currency.address : currency === ETHER ? 'ETH' : ''}`

export default function Swap() {
  return (
    <AppBody>
      <SwapPoolTabs active={'swap'} />
      <Wrapper id="swap-page">
        <AutoColumn gap={'md'}>
          <AssetList getLink={getTokenLink} />
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}
