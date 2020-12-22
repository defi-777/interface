import { darken } from 'polished'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Text } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonEmpty, ButtonPrimary } from '../../components/Button'
import Card, { LightCard } from '../../components/Card'
import { AutoColumn } from '../../components/Column'
import { RowBetween, RowFixed } from '../../components/Row'
import { Action, Adapter } from '../../state/actions/types'
import ActionIcon from '../Token/ActionIcon'
import AdapterRow from './AdapterRow'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`
const StyledPositionCard = styled(LightCard)<{ bgColor: any }>`
  border: none;
  background: radial-gradient(91.85% 100% at 1.84% 0%, rgba(149, 154, 75, 0.5) 0%, #24262b 100%);
  position: relative;
  overflow: hidden;
  border: solid 1px ${({ theme }) => theme.accent};
`

const HeaderText = styled(Text)`
  overflow: hidden;
  max-height: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 20px;
  margin: 0 10px 0 12px !important;
`

const ActionCard: React.FC<{ action: Action }> = ({ action }) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <StyledPositionCard bgColor="#2172E5">
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <RowFixed>
            <ActionIcon id={action.id} />
            <HeaderText>{action.name}</HeaderText>
          </RowFixed>

          <RowFixed gap="8px">
            <ButtonEmpty
              padding="6px 8px"
              borderRadius="12px"
              width="fit-content"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? (
                <ChevronUp size={20} style={{ marginLeft: '10px' }} />
              ) : (
                <ChevronDown size={20} style={{ marginLeft: '10px' }} />
              )}
            </ButtonEmpty>
          </RowFixed>
        </FixedHeightRow>

        {showMore && (
          <AutoColumn gap="8px">
            {action.adapters.length === 1 ? (
              <AdapterRow adapter={action.adapters[0]} label="Adapter" />
            ) : (
              action.adapters.map((adapter: Adapter) => (
                <AdapterRow key={adapter.address} adapter={adapter} label={adapter.name} />
              ))
            )}
            {action.factory && (
              <ButtonPrimary padding="8px" borderRadius="8px" as={Link} to={`/adapters/new/${action.id}`}>
                Create New Adapter
              </ButtonPrimary>
            )}
          </AutoColumn>
        )}
      </AutoColumn>
    </StyledPositionCard>
  )
}
export default ActionCard
