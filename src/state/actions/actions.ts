import { createAction } from '@reduxjs/toolkit'
import { Action } from './types'

export const actionFetchStarted = createAction('actions/fetchStart')
export const actionFetchCompleted = createAction<Action[]>('actions/fetchCompleted')
export const actionFetchFailed = createAction('actions/fetchFailed')
