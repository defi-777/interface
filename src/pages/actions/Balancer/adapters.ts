export interface Adapter {
  address: string
  name: string
}

export const entryAdapters: Adapter[] = [
  {
    address: '0x065a82d64b404c6ee240bc67d9c6f9e7beedc95a',
    name: 'ETH/MKR Pool'
  }
]

export const exitAdapters: Adapter[] = []
