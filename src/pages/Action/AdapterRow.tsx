import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { Link } from 'react-router-dom'
import Column from '../../components/Column'
import { MenuItem } from '../../components/SearchModal/styleds'
import TokenIcon from '../../components/AssetList/TokenIcon'
import { useToken } from '../../state/tokens/hooks'
import { Adapter, Action } from '../../state/actions/types'
import { Token } from '../../state/tokens/types'

const MenuLink = styled(MenuItem)`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
`

interface AdapterRowProps {
  action: Action
  adapter: Adapter
  token: Token
}

const AdapterRow: React.FC<AdapterRowProps> = ({ action, adapter, token }) => {
  const outputWrapper = useToken(adapter.outputWrapper)

  if (adapter.outputWrapper === token.address) {
    return null
  }

  return (
    <MenuLink as={Link} to={`/action/${action.id}/${token.address}/${adapter.symbol}`}>
      <TokenIcon token={outputWrapper ?? undefined} />
      <Column>
        <Text title={adapter.name} fontWeight={500}>
          {adapter.name}
        </Text>
      </Column>
    </MenuLink>
  )
}

export default AdapterRow
