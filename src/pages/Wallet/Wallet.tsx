import React, { Fragment } from 'react'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useActiveWeb3React } from '../../hooks'
import { ButtonLight, ButtonPrimary } from '../../components/Button'
import { RowBetween } from '../../components/Row'
import { Link } from 'react-router-dom'
import AppBody from '../AppBody'
import AssetList from '../../components/AssetList'

const Wallet: React.FC = () => {
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected

  return (
    <AppBody>
      <SwapPoolTabs active={'swap'} />
      <Wrapper id="swap-page">
        <AutoColumn gap={'md'}>
          {account ? (
            <AssetList />
          ) : (
            <Fragment>
              <Text>Connect to your wallet to view use DeFi777</Text>
              <ButtonPrimary onClick={toggleWalletModal}>Connect Wallet</ButtonPrimary>
              <RowBetween marginTop="10px">
                <ButtonLight padding="8px" borderRadius="8px" as={Link} to="/wrappers" width="48%" >
                  View DeFi777 Wrappers
                </ButtonLight>
                <ButtonLight padding="8px" borderRadius="8px" as={Link} width="48%" to="/adapters">
                  View DeFi777 Adapters
                </ButtonLight>
              </RowBetween>
            </Fragment>
          )}
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}

export default Wallet
