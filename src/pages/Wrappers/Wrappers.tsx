import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { TYPE, HideSmall } from '../../theme'
import { Text } from 'rebass'
import { useTokens } from '../../state/tokens/hooks'
import { Token } from '../../state/tokens/types'
import { RowBetween, RowFixed } from '../../components/Row'
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import WrapperCard from './WrapperCard'

// import { useActiveWeb3React } from '../../hooks'

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

const ButtonRow = styled(RowFixed)`
  gap: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  `};
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

export default function Pool() {
  // const theme = useContext(ThemeContext)
  // const { account } = useActiveWeb3React()
  const erc777s = useTokens({ yieldAdapter: false, type: 'erc777' })

  return (
    <PageWrapper>
      <AutoColumn gap="lg" justify="center">
        <AutoColumn gap="lg" style={{ width: '100%' }}>
          <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
            <HideSmall>
              <TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }}>
                DeFi777 Wrapper Tokens
              </TYPE.mediumHeader>
            </HideSmall>
            <ButtonRow>
              <ResponsiveButtonPrimary id="join-pool-button" as={Link} padding="6px 8px" to="/new-wrapper">
                <Text fontWeight={500} fontSize={16}>
                  Create Wrapper
                </Text>
              </ResponsiveButtonPrimary>
            </ButtonRow>
          </TitleRow>

          {erc777s.map((token: Token) => (
            <WrapperCard key={token.address} token={token} />
          ))}
        </AutoColumn>
      </AutoColumn>
    </PageWrapper>
  )
}
