import { createReducer } from '@reduxjs/toolkit'
import { actionFetchStarted, actionFetchCompleted, actionFetchFailed } from './actions'
import { ActionsState, Action } from './types'

const hardcodedActions: { [id: string]: Action } = {
  wrap: {
    id: 'wrap',
    name: 'Wrap',
    description: 'Supercharge your ERC20 tokens by convering to DeFi777 tokens',
    path: '/wrap/:token',
    includeType: ['erc20'],
    adapters: []
  }
}
const hardcodedIds = Object.keys(hardcodedActions)

const initialState: ActionsState = {
  actionIds: hardcodedIds,
  byId: hardcodedActions,
  updating: false,
  fetched: false
}

export default createReducer(initialState, builder =>
  builder
    .addCase(actionFetchStarted, state => {
      state.updating = true
    })
    .addCase(actionFetchCompleted, (state, { payload: actions }) => {
      const ids = [...hardcodedIds]
      for (const action of actions) {
        ids.push(action.id)
        state.byId[action.id] = action
      }
      state.actionIds = ids
      state.updating = false
      state.fetched = true
    })
    .addCase(actionFetchFailed, state => {
      state.updating = false
    })
)
