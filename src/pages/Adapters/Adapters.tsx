import React from 'react'
import styled from 'styled-components'
import { useActions } from '../../state/actions/hooks'
import { TYPE, HideSmall } from '../../theme'
import { RowBetween } from '../../components/Row'
import { AutoColumn } from '../../components/Column'
import ActionCard from './ActionCard'
import { Action } from '../../state/actions/types'
import { LightCard } from '../../components/Card'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`

const Adapters: React.FC = () => {
  const actions = useActions().filter((action: Action) => action.adapters.length > 0)

  return (
    <PageWrapper>
      <AutoColumn gap="lg" justify="center">
        <LightCard>
          <strong>Caution:</strong> <em>Only</em> send ERC-777 tokens to DeFi777 adapters. Sending unwrapped ERC-20{' '}
          tokens may result in lost funds.
        </LightCard>

        <AutoColumn gap="lg" style={{ width: '100%' }}>
          <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
            <HideSmall>
              <TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }}>
                DeFi777 Adapters
              </TYPE.mediumHeader>
            </HideSmall>
          </TitleRow>

          {actions.map((action: Action) => (
            <ActionCard key={action.id} action={action} />
          ))}
        </AutoColumn>
      </AutoColumn>
    </PageWrapper>
  )
}

export default Adapters
