import React from 'react'
import { Text } from 'rebass'
import { Link } from 'react-router-dom'
import Column from '../../components/Column'
import AppBody from '../AppBody'
import { Action } from '../../state/actions/types'
import { AutoColumn } from '../../components/Column'
import { Currency, Token, ETHER } from '@uniswap/sdk'
import styled from 'styled-components'
import { MenuItem } from '../../components/SearchModal/styleds'

const MenuLink = styled(MenuItem)`
  text-decoration: none;
  color: #111111;
  grid-template-columns: auto;
`

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETH' : ''
}

interface AdapterSelectionPageProps {
  action: Action
  currency: Currency
}

const AdapterSelectionPage: React.FC<AdapterSelectionPageProps> = ({ action, currency }) => {
  return (
    <AppBody>
      <h2>{action.name}</h2>

      <AutoColumn gap={'md'}>
        {action.adapters.map(adapter => (
          <MenuLink
            as={Link}
            to={`/action/${action.id}/${currencyKey(currency)}/${adapter.symbol}`}
            key={adapter.address}
          >
            <Column>
              <Text title={adapter.name} fontWeight={500}>
                {adapter.name}
              </Text>
            </Column>
          </MenuLink>
        ))}
      </AutoColumn>
    </AppBody>
  )
}

export default AdapterSelectionPage
