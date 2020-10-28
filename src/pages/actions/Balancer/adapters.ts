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

export const exitAdapters: Adapter[] = [
  {
    address: '0xaf5d029ae732E6C0FdAFb63C4D6d91E2710fbBB0',
    name: 'ETH'
  },
  {
    address: '0xE11BC802a0402974b821b7d71B7e544BfF784b95',
    name: 'MKR'
  }
]
