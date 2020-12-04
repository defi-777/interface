import React from 'react'
import { Currency, Token, ETHER } from '@uniswap/sdk'
import { Text } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Column from '../../components/Column'
import { RowFixed } from '../../components/Row'
import CurrencyLogo from '../../components/CurrencyLogo'
import { FadedSpan, MenuItem } from '../../components/SearchModal/styleds'
import { ChevronRight } from 'react-feather'
import { Action } from '../../state/actions/types'

const MenuLink = styled(MenuItem)`
  text-decoration: none;
  color: #111111;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  height: 72px;
`

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETH' : ''
}

export default function ActionRow({
  action,
  currency,
  disabled
}: {
  action: Action
  currency: Currency
  disabled?: boolean
}) {
  const key = currencyKey(currency)
  const path = action.path ? action.path.replace(':token', key) : `/action/${action.id}/${key}`
  return (
    <MenuLink as={Link} to={path}>
      <CurrencyLogo currency={currency} size={'24px'} />
      <Column>
        <Text title={currency.name} fontWeight={500}>
          {action.name}
        </Text>
        <FadedSpan>{action.description}</FadedSpan>
      </Column>
      {!disabled && (
        <RowFixed style={{ justifySelf: 'flex-end' }}>
          <ChevronRight />
        </RowFixed>
      )}
    </MenuLink>
  )
}
