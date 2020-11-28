import { useDispatch, useSelector } from 'react-redux'
import { Action } from './types'
import { AppDispatch, AppState } from '../index'
import { actionFetchStarted, actionFetchCompleted, actionFetchFailed } from './actions'

async function fetchActions() {
  const request = await fetch('https://defi777-kovan-api.vercel.app/api/actions.json')
  const result = await request.json()
  return result.actions
}

export function useActions(): Action[] {
  const actions = useSelector<AppState, AppState['actions']>(state => state.actions)
  const dispatch = useDispatch<AppDispatch>()

  if (actions.actionIds.length === 0 && !actions.updating) {
    dispatch(actionFetchStarted())
    fetchActions()
      .then((actions: any) => dispatch(actionFetchCompleted(actions)))
      .catch((e: any) => {
        console.warn(`Fetch actions failed: ${e.message}`)
        dispatch(actionFetchFailed())
      })
  }
  return actions.actionIds.map((id: string) => actions.byId[id]!)
}

export function useAction(id: string): Action | null {
  const actions = useSelector<AppState, AppState['actions']>(state => state.actions)
  const dispatch = useDispatch<AppDispatch>()

  if (actions.actionIds.length === 0 && !actions.updating) {
    dispatch(actionFetchStarted())
    fetchActions()
      .then((actions: any) => dispatch(actionFetchCompleted(actions)))
      .catch((e: any) => {
        console.warn(`Fetch actions failed: ${e.message}`)
        dispatch(actionFetchFailed())
      })
  }
  return actions.byId[id] || null
}
