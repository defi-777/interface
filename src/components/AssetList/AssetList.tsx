import React, { Fragment } from 'react'
import { useTokens, useToken } from '../../state/tokens/hooks'
import { Token } from '../../state/tokens/types'
import AssetRow from './AssetRow'
import YieldWrapperRow from './YieldWrapperRow'
import styled from 'styled-components'

const SubHeading = styled.div`
  font-weight: 600;
  opacity: 0.6;
  margin: 12px 60px;
`

export default function AssetList() {
  const eth = useToken('0x0000000000000000000000000000000000000000')!
  const erc777s = useTokens({ yieldAdapter: false, type: 'erc777' })
  const erc20s = useTokens({ yieldAdapter: false, type: 'erc20' })

  return (
    <div>
      <AssetRow token={eth} />

      <SubHeading>777 Tokens</SubHeading>
      {erc777s.map((token: Token) => (
        <Fragment key={token.address}>
          <AssetRow token={token} />
          {token.yieldWrappers &&
            token.yieldWrappers.map((yieldWrapper: any) => (
              <YieldWrapperRow
                key={yieldWrapper.yieldAdapter}
                parentToken={token}
                address={yieldWrapper.yieldAdapter}
              />
            ))}
        </Fragment>
      ))}

      <SubHeading>ERC-20 tokens</SubHeading>
      {erc20s.map((token: Token) => (
        <AssetRow key={token.address} token={token} />
      ))}
    </div>
  )
}
