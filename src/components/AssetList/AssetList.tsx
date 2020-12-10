import React, { Fragment } from 'react'
import { useTokens } from '../../state/tokens/hooks'
import { Token } from '../../state/tokens/types'
import AssetRow from './AssetRow'
import YieldWrapperRow from './YieldWrapperRow'

export default function AssetList() {
  const tokens = useTokens({ yieldAdapter: false })

  return (
    <div>
      {tokens.map((token: Token) => (
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
    </div>
  )
}
