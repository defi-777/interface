import { TokenProtocol } from '../tokens/types'

export interface Adapter {
  readonly address: string
  readonly name: string
  readonly symbol: string
  readonly outputWrapper: string
}

export interface Action {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly path?: string
  readonly factory?: {
    readonly address: string
  }
  readonly includeType?: string[]
  readonly includeProtocol?: TokenProtocol[]
  readonly includeUnderlying?: string[]
  readonly adapters: Adapter[]
  readonly sort?: number
}

export interface ActionsState {
  readonly byId: { readonly [id: string]: Action }
  readonly actionIds: string[]
  readonly updating: boolean
  readonly fetched: boolean
}
