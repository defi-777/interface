import React from 'react'
import { AutoColumn } from '../../components/Column'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'

import AppBody from '../AppBody'
import AssetList from '../../components/AssetList'

export default function Swap() {
  return (
    <AppBody>
      <SwapPoolTabs active={'swap'} />
      <Wrapper id="swap-page">
        <AutoColumn gap={'md'}>
          <AssetList />
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}
