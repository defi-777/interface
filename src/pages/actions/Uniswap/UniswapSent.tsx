import React, { useContext } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import AppBody from '../../AppBody'
import { Wrapper } from '../../../components/swap/styleds'
import styled, { ThemeContext } from 'styled-components'
import { ExternalLink } from '../../../theme'
import { Text } from 'rebass'
import { CloseIcon } from '../../../theme/components'
import { RowBetween } from '../../../components/Row'
import { ArrowUpCircle } from 'react-feather'
import { ButtonPrimary } from '../../../components/Button'
import { AutoColumn, ColumnCenter } from '../../../components/Column'

import { getEtherscanLink } from '../../../utils'
import { useActiveWeb3React } from '../../../hooks'

const Section = styled(AutoColumn)`
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 60px 0;
`

export default function UniswapOutputSelection({
  match: {
    params: { txHash }
  },
  history
}: RouteComponentProps<{ txHash: string; amount: string }>) {
  const { chainId } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  return (
    <AppBody>
      <Wrapper>
        <Section>
          <RowBetween>
            <div />
            <CloseIcon onClick={() => history.push('/swap')} />
          </RowBetween>
          <ConfirmedIcon>
            <ArrowUpCircle strokeWidth={0.5} size={90} color={theme.primary1} />
          </ConfirmedIcon>
          <AutoColumn gap="12px" justify="center">
            <Text fontWeight={500} fontSize={20}>
              Transaction Submitted
            </Text>
            {chainId && txHash && (
              <ExternalLink href={getEtherscanLink(chainId, txHash, 'transaction')}>
                <Text fontWeight={500} fontSize={14} color={theme.primary1}>
                  View on Etherscan
                </Text>
              </ExternalLink>
            )}
            <ButtonPrimary as={Link} to="/swap" style={{ margin: '20px 0 0 0' }}>
              <Text fontWeight={500} fontSize={20}>
                Close
              </Text>
            </ButtonPrimary>
          </AutoColumn>
        </Section>
      </Wrapper>
    </AppBody>
  )
}
