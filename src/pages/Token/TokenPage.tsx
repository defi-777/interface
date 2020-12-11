import React from 'react'
import { ExternalLink as ExternalLinkIcon } from 'react-feather'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { AutoColumn } from '../../components/Column'
import AppBody from '../AppBody'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useCurrency } from '../../hooks/Tokens'
import { useToken } from '../../state/tokens/hooks'
import { Wrapper } from '../../components/swap/styleds'
import ActionList from './ActionList'
import { ExternalLink } from '../../theme'
import { getEtherscanLink } from '../../utils'

const Header = styled.div`
  padding-bottom: 12px;
  border-bottom: solid 1px #eeeeee;
`

const Title = styled.h2`
  font-weight: 500;
  font-size: 20px;
`
const Balance = styled.div`
  font-weight: 500;
  font-size: 16px;
  opacity: 0.8;
`

const SubHeading = styled.div`
  font-weight: 600;
  opacity: 0.6;
  margin: 24px 60px 0 60px;
`

export default function Swap({
  match: {
    params: { address }
  }
}: RouteComponentProps<{ address: string }>) {
  const { account, chainId } = useActiveWeb3React()
  const token = useToken(address)

  const currency = useCurrency(address)
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  if (!token) {
    return (
      <AppBody>
        <Wrapper>Loading...</Wrapper>
      </AppBody>
    )
  }

  return (
    <AppBody>
      <Header>
        <Title>
          {token.name}
          <ExternalLink href={getEtherscanLink(chainId!, token.address, 'address')}>
            <ExternalLinkIcon size={18} />
          </ExternalLink>
        </Title>

        {selectedCurrencyBalance && (
          <Balance>
            Balance: {selectedCurrencyBalance.toSignificant(6)} {token.symbol}
          </Balance>
        )}
      </Header>

      <Wrapper>
        <SubHeading>Actions</SubHeading>
        <AutoColumn gap={'md'}>
          <ActionList token={token} disabled={!account} />
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}
