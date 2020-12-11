import React from 'react'
import ActionRow from './ActionRow'
import { useActions } from '../../state/actions/hooks'
import { Token } from '../../state/tokens/types'

const ActionList: React.FC<{ token: Token; disabled?: boolean }> = ({ token, disabled }) => {
  const actions = useActions(token)

  return (
    <div>
      {actions.map(action => (
        <ActionRow key={action.id} action={action} token={token} disabled={disabled} />
      ))}
    </div>
  )
}

export default ActionList
