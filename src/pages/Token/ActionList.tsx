import React from 'react'
import { Currency } from '@uniswap/sdk'
import ActionRow from './ActionRow'
import { useActions } from '../../state/actions/hooks'

export default function ActionList({ token, disabled }: { token: Currency; disabled?: boolean }) {
  const actions = useActions(token)

  return (
    <div>
      {actions.map(action => (
        <ActionRow key={action.id} action={action} currency={token} disabled={disabled} />
      ))}
    </div>
  )
}
