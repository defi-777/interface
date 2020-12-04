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
  readonly includeTag?: string
  readonly excludeTag?: string
  readonly adapters: Adapter[]
}

export interface ActionsState {
  readonly byId: { readonly [id: string]: Action }
  readonly actionIds: string[]
  readonly updating: boolean
  readonly fetched: boolean
}
