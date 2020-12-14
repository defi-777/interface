import React from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { Adapter } from '../../state/actions/types'
import { useAction } from '../../state/actions/hooks'
import { useToken } from '../../state/tokens/hooks'
import { tokenToCurrency } from '../../state/tokens/utils'
import AdapterSelectionPage from './AdapterSelectionPage'
import AmountPage from './AmountPage'

interface ActionParams {
  actionId: string
  currencyId: string
  adapter?: string
}

const Action: React.FC<RouteComponentProps<ActionParams>> = ({ match }) => {
  const action = useAction(match.params.actionId)
  const token = useToken(match.params.currencyId)
  const currency = token ? tokenToCurrency(token) : undefined

  if (!action) {
    return <div>Not found...</div>
  }

  if (!token) {
    return <Redirect to="/" />
  }

  let adapter: Adapter | null = null
  if (action.adapters.length === 1) {
    adapter = action.adapters[0]
  } else if (match.params.adapter) {
    for (const _adapter of action.adapters) {
      if (_adapter.symbol === match.params.adapter) {
        adapter = _adapter
      }
    }
  }

  if (!adapter) {
    return <AdapterSelectionPage action={action} token={token} />
  }

  return <AmountPage action={action} adapter={adapter} currency={currency!} />
}

export default Action
