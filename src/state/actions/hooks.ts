import { useDispatch, useSelector } from 'react-redux'
import { Action } from './types'
import { AppDispatch, AppState } from '../index'
import { actionFetchStarted, actionFetchCompleted, actionFetchFailed } from './actions'
import { useActiveWeb3React } from '../../hooks'
import { Token } from '../tokens/types'

async function fetchActions(network: string) {
  const request = await fetch(`https://defi777-api.vercel.app/api/${network}/actions.json`)
  const result = await request.json()
  return result.actions
}

function actionMatchesToken(action: Action, token: Token): boolean {
  if (action.includeType && action.includeType.indexOf(token.type) === -1) {
    return false
  }
  if (action.includeProtocol && action.includeProtocol.indexOf(token.protocol) === -1) {
    return false
  }
  if (action.includeUnderlying && action.includeUnderlying.indexOf(token.underlyingAddress || '') === -1) {
    return false
  }

  return true
}

const chains: { [chainId: number]: string } = {
  1: 'mainnet',
  42: 'kovan'
}

export function useActions(token: Token): Action[] {
  const actions = useSelector<AppState, AppState['actions']>(state => state.actions)
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  if (!actions.fetched && !actions.updating) {
    dispatch(actionFetchStarted())
    fetchActions(chains[chainId as number])
      .then((actions: any) => dispatch(actionFetchCompleted(actions)))
      .catch((e: any) => {
        console.warn(`Fetch actions failed: ${e.message}`)
        dispatch(actionFetchFailed())
      })
  }
  return actions.actionIds
    .map((id: string) => actions.byId[id]!)
    .filter((action: Action) => actionMatchesToken(action, token))
    .sort((a: Action, b: Action) => (b.sort || 0) - (a.sort || 0))
}

export function useAction(id: string): Action | null {
  const actions = useSelector<AppState, AppState['actions']>(state => state.actions)
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  if (!actions.fetched && !actions.updating) {
    dispatch(actionFetchStarted())
    fetchActions(chains[chainId as number])
      .then((actions: any) => dispatch(actionFetchCompleted(actions)))
      .catch((e: any) => {
        console.warn(`Fetch actions failed: ${e.message}`)
        dispatch(actionFetchFailed())
      })
  }
  return actions.byId[id] || null
}
