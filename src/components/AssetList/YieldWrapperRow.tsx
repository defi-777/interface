import React from 'react'
import { CurrencyAmount } from '@uniswap/sdk'
import { Text } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useActiveWeb3React } from '../../hooks'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useToken } from '../../state/tokens/hooks'
import { Token } from '../../state/tokens/types'
import { tokenToCurrency } from '../../state/tokens/utils'
import Column from '../Column'
import { RowFixed } from '../Row'
import { MenuItem } from '../SearchModal/styleds'
import Loader from '../Loader'
import TokenIcon from './TokenIcon'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

const MenuLink = styled(MenuItem)`
  padding-left: 40px;
  height: 36px;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
`

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

const YieldWrapperRow: React.FC<{ address: string; parentToken: Token }> = ({ address, parentToken }) => {
  const { account } = useActiveWeb3React()
  const token = useToken(address)
  const currency = token ? tokenToCurrency(token) : undefined
  const balance = useCurrencyBalance(account ?? undefined, currency)

  const parentBalance = useCurrencyBalance(account ?? undefined, tokenToCurrency(parentToken))

  if (!parentBalance || parentBalance.toExact() === '0') {
    return null
  }

  if (!token) {
    return null
  }

  return (
    <MenuLink as={Link} to={`token/${token.address}`}>
      <TokenIcon token={token} size={20} />
      <Column>
        <Text title={token.name} fontWeight={500}>
          {token.symbol}
        </Text>
      </Column>
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
      </RowFixed>
    </MenuLink>
  )
}

export default YieldWrapperRow
