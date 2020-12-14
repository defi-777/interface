import { darken } from 'polished'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Text } from 'rebass'
import styled from 'styled-components'
// import { useTotalSupply } from '../../data/TotalSupply'

import { useActiveWeb3React } from '../../hooks'
// import { useTokenBalance } from '../../state/wallet/hooks'
import { Token } from '../../state/tokens/types'
import { ExternalLink } from '../../theme'
import { ButtonEmpty } from '../../components/Button'
// import { transparentize } from 'polished'
import { getEtherscanLink } from '../../utils'

// import { useColor } from '../../hooks/useColor'

import Card, { LightCard } from '../../components/Card'
import { AutoColumn } from '../../components/Column'
import { RowBetween, RowFixed } from '../../components/Row'
import TokenIcon from '../../components/AssetList/TokenIcon'

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

const WrapperCard: React.FC<{ token: Token }> = ({ token }) => {
  const { chainId } = useActiveWeb3React()

  const [showMore, setShowMore] = useState(false)

  return (
    <StyledPositionCard bgColor="#2172E5">
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <RowFixed>
            <TokenIcon token={token} size={20} />
            <HeaderText>{token.name}</HeaderText>
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
            <FixedHeightRow>
              <Text fontSize={16} fontWeight={500}>
                Token Address:
              </Text>
              <Text fontSize={16} fontWeight={500}>
                <ExternalLink href={getEtherscanLink(chainId || 1, token.address, 'address')}>
                  {token.address}
                </ExternalLink>
              </Text>
            </FixedHeightRow>
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  Wrapped Token Address:
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  <ExternalLink href={getEtherscanLink(chainId || 1, token.underlyingAddress!, 'address')}>
                    {token.underlyingAddress}
                  </ExternalLink>
                </Text>
              </RowFixed>
            </FixedHeightRow>
          </AutoColumn>
        )}
      </AutoColumn>
    </StyledPositionCard>
  )
}
export default WrapperCard
