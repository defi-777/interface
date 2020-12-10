import React, { Fragment } from 'react'
import { useTokens } from '../../state/tokens/hooks'
import { Token } from '../../state/tokens/types'
import AssetRow from './AssetRow'

export default function AssetList() {
  const tokens = useTokens()

  return (
    <div>
      {tokens.map((token: Token) => (
        <Fragment key={token.address}>
          <AssetRow token={token} />
        </Fragment>
      ))}
    </div>
  )
}
