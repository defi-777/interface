import React from 'react'
import { Currency } from '@uniswap/sdk'
import ActionRow from './ActionRow'
import actions from '../../actions/actions'

export default function ActionList({ token, disabled }: { token: Currency; disabled?: boolean }) {
  const availableActions = actions.filter(action => action.supportsToken(token))
  return (
    <div>
      {availableActions.map(action => (
        <ActionRow key={action.id} action={action} currency={token} disabled={disabled} />
      ))}
    </div>
  )
}
