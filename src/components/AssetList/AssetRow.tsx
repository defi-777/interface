import React from 'react'
import { Currency, CurrencyAmount } from '@uniswap/sdk'
import { Text } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useActiveWeb3React } from '../../hooks'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import Column from '../Column'
import { RowFixed } from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import { FadedSpan, MenuItem } from '../SearchModal/styleds'
import Loader from '../Loader'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

const MenuLink = styled(MenuItem)`
  text-decoration: none;
  color: #111111;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
`

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

export default function CurrencyRow({
  currency,
  getLink
}: {
  currency: Currency
  getLink: (currency: Currency) => string
}) {
  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, currency)

  if (!balance || balance.toExact() === '0') {
    return null
  }

  // only show add or remove buttons if not on selected list
  return (
    <MenuLink as={Link} to={getLink(currency)}>
      <CurrencyLogo currency={currency} size={'24px'} />
      <Column>
        <Text title={currency.name} fontWeight={500}>
          {currency.symbol}
        </Text>
        <FadedSpan>Token</FadedSpan>
      </Column>
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
      </RowFixed>
    </MenuLink>
  )
}
