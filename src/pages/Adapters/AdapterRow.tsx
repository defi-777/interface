import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { RowBetween } from '../../components/Row'
import { ExternalLink } from '../../theme'
import { getEtherscanLink } from '../../utils'
import useENSName from '../../hooks/useENSName'
import { useActiveWeb3React } from '../../hooks'
import { Adapter } from '../../state/actions/types'
// import TokenIcon from '../../components/AssetList/TokenIcon'

const RightCol = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 0;
  flex: 1;
  margin-left: 10px !important;
  text-align: right;
  min-width: 100px !important;
`

interface AdapterRowProps {
  adapter: Adapter
  label: string
}

const AdapterRow: React.FC<AdapterRowProps> = ({ adapter, label }) => {
  const { ENSName } = useENSName(adapter.address)
  const { chainId } = useActiveWeb3React()

  return (
    <RowBetween>
      <Text fontSize={16} fontWeight={500}>
        {label}:
      </Text>
      <RightCol>
        <ExternalLink href={getEtherscanLink(chainId || 1, adapter.address, 'address')}>
          {ENSName || adapter.address}
        </ExternalLink>
      </RightCol>
    </RowBetween>
  )
}

export default AdapterRow
