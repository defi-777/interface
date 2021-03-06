import React from 'react'
import { CurrencyAmount } from '@uniswap/sdk'
import { Text } from 'rebass'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useActiveWeb3React } from '../../hooks'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { Token } from '../../state/tokens/types'
import { tokenToCurrency } from '../../state/tokens/utils'
import Column from '../Column'
import { RowFixed } from '../Row'
import { FadedSpan, MenuItem } from '../SearchModal/styleds'
import Loader from '../Loader'
import TokenIcon from './TokenIcon'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

const MenuLink = styled(MenuItem)`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
`

const Subtitle = styled(FadedSpan)`
  color: ${({ theme }) => theme.text2};
`

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

const AssetRow: React.FC<{ token: Token }> = ({ token }) => {
  const { account } = useActiveWeb3React()
  const currency = tokenToCurrency(token)
  const balance = useCurrencyBalance(account ?? undefined, currency)

  if (!balance || balance.toExact() === '0') {
    return null
  }

  let subtitle = ''
  if (token.type === 'erc20') {
    subtitle = 'ERC20 Token'
  } else if (token.type === 'erc777') {
    subtitle = '777 Token'
  }
  if (token.protocol) {
    subtitle = `${token.protocol} ${subtitle}`
  }

  return (
    <MenuLink as={Link} to={`token/${token.address}`}>
      <TokenIcon token={token} />
      <Column>
        <Text title={token.name} fontWeight={500}>
          {token.symbol}
        </Text>
        <Subtitle>{subtitle}</Subtitle>
      </Column>
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
      </RowFixed>
    </MenuLink>
  )
}

export default AssetRow
