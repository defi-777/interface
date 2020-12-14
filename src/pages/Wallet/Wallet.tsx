import React from 'react'
import { AutoColumn } from '../../components/Column'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'

import AppBody from '../AppBody'
import AssetList from '../../components/AssetList'

const Wallet: React.FC = () => {
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

export default Wallet
