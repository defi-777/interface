import React from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { Link, RouteComponentProps } from 'react-router-dom'
import { AutoColumn } from '../../../components/Column'
import AppBody from '../../AppBody'
import { useCurrency } from '../../../hooks/Tokens'
import { Wrapper } from '../../../components/swap/styleds'
import { MenuItem } from '../../../components/SearchModal/styleds'
import Column from '../../../components/Column'
import { exitAdapters } from './adapters'

const MenuLink = styled(MenuItem)`
  text-decoration: none;
  color: #111111;
  grid-template-columns: auto;
`

export default function UniswapOutputSelection({
  match: {
    params: { currencyIdA }
  }
}: RouteComponentProps<{ currencyIdA: string }>) {
  const token = useCurrency(currencyIdA)

  if (!token) {
    return (
      <AppBody>
        <Wrapper>Loading...</Wrapper>
      </AppBody>
    )
  }

  return (
    <AppBody>
      <h2>Balancer Pool Exit</h2>
      <Wrapper>
        <AutoColumn gap={'md'}>
          {exitAdapters.map(adapter => (
            <MenuLink as={Link} to={`/balancer-exit/${currencyIdA}/${adapter.address}`} key={adapter.address}>
              <Column>
                <Text title={adapter.name} fontWeight={500}>
                  {adapter.name}
                </Text>
              </Column>
            </MenuLink>
          ))}
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}
