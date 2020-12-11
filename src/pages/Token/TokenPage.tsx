import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useActiveWeb3React } from '../../hooks'
import { AutoColumn } from '../../components/Column'
import AppBody from '../AppBody'
import { useToken } from '../../state/tokens/hooks'
import { Wrapper } from '../../components/swap/styleds'
import ActionList from './ActionList'

export default function Swap({
  match: {
    params: { address }
  }
}: RouteComponentProps<{ address: string }>) {
  const { account } = useActiveWeb3React()
  const token = useToken(address)

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
