import { createReducer } from '@reduxjs/toolkit'
import { actionFetchStarted, actionFetchCompleted, actionFetchFailed } from './actions'
import { ActionsState } from './types'

const initialState: ActionsState = {
  actionIds: [],
  byId: {},
  updating: false
}

export default createReducer(initialState, builder =>
  builder
    .addCase(actionFetchStarted, state => {
      state.updating = true
    })
    .addCase(actionFetchCompleted, (state, { payload: actions }) => {
      const ids = []
      for (const action of actions) {
        ids.push(action.id)
        state.byId[action.id] = action
      }
      state.actionIds = ids
      state.updating = false
    })
    .addCase(actionFetchFailed, state => {
      state.updating = false
    })
)
