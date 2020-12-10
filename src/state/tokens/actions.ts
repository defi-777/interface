import { createAction } from '@reduxjs/toolkit'

export const tokenFetchStarted = createAction('tokens/fetchStart')
export const tokenFetchCompleted = createAction<any>('tokens/fetchCompleted')
export const tokenFetchFailed = createAction('tokens/fetchFailed')
