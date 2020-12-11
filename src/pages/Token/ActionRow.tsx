import React from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Column from '../../components/Column'
import { RowFixed } from '../../components/Row'
import CurrencyLogo from '../../components/CurrencyLogo'
import { FadedSpan, MenuItem } from '../../components/SearchModal/styleds'
import { ChevronRight } from 'react-feather'
import { Action } from '../../state/actions/types'
import { Token } from '../../state/tokens/types'

const MenuLink = styled(MenuItem)`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  height: 72px;
`

const Description = styled(FadedSpan)`
  color: ${({ theme }) => theme.text2};
`

interface ActionRowProps {
  action: Action
  token: Token
  disabled?: boolean
}

const ActionRow: React.FC<ActionRowProps> = ({ action, token, disabled }) => {
  const path = action.path ? action.path.replace(':token', token.address) : `/action/${action.id}/${token.address}`
  return (
    <MenuLink as={Link} to={path}>
      <CurrencyLogo currency={token} size={'24px'} />
      <Column>
        <Text title={action.name} fontWeight={500}>
          {action.name}
        </Text>
        <Description>{action.description}</Description>
      </Column>
      {!disabled && (
        <RowFixed style={{ justifySelf: 'flex-end' }}>
          <ChevronRight />
        </RowFixed>
      )}
    </MenuLink>
  )
}

export default ActionRow
