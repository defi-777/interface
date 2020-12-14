import React, { Fragment } from 'react'
import { ExternalLink as ExternalLinkIcon } from 'react-feather'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { AutoColumn } from '../../components/Column'
import AppBody from '../AppBody'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useToken } from '../../state/tokens/hooks'
import { Wrapper } from '../../components/swap/styleds'
import ActionList from './ActionList'
import { ExternalLink } from '../../theme'
import { getEtherscanLink } from '../../utils'
import { CardHeader } from '../../components/NavigationTabs'
import { tokenToCurrency } from '../../state/tokens/utils'

const Header = styled.div`
  padding-bottom: 12px;
  border-bottom: solid 1px #eeeeee;
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

const help = {
  erc777: 'DeFi777 tokens wrap existing ERC-20 tokens',
  erc20: 'ERC-20 tokens must be wrapped into DeFi777 tokens before they can be used in DeFi protocols',
  eth: 'Ether is the native token of Ethereum',
  yield: 'These tokens are accured as yield from another protocol'
}

export default function Swap({
  match: {
    params: { address }
  }
}: RouteComponentProps<{ address: string }>) {
  const { account, chainId } = useActiveWeb3React()
  const token = useToken(address)

  const currency = token ? tokenToCurrency(token) : undefined
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
        <CardHeader
          back="/wallet"
          title={
            <Fragment>
              {token.name}
              {token.type !== 'eth' && (
                <ExternalLink href={getEtherscanLink(chainId!, token.address, 'address')}>
                  <ExternalLinkIcon size={18} />
                </ExternalLink>
              )}
            </Fragment>
          }
          help={help[token.type]}
        />

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
