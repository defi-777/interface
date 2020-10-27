import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useActiveWeb3React } from '../../hooks'
import { AutoColumn } from '../../components/Column'
import AppBody from '../AppBody'
import { useCurrency } from '../../hooks/Tokens'
// import AssetList from '../../components/AssetList'
import { Wrapper } from '../../components/swap/styleds'
import ActionList from './ActionList'

export default function Swap({
  match: {
    params: { address }
  }
}: RouteComponentProps<{ address: string }>) {
  const { account } = useActiveWeb3React()
  const token = useCurrency(address)

  if (!token) {
    return (
      <AppBody>
        <Wrapper>Loading...</Wrapper>
      </AppBody>
    )
  }

  return (
    <AppBody>
      <h2>{token.name}</h2>
      <Wrapper>
        <AutoColumn gap={'md'}>
          <ActionList token={token} disabled={!account} />
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}
