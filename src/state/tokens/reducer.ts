import { createReducer } from '@reduxjs/toolkit'
import { tokenFetchStarted, tokenFetchCompleted, tokenFetchFailed } from './actions'
import { TokenState, Token, Ether } from './types'

const hardcodedTokens: { [id: string]: Token } = {
  [Ether.address]: Ether
}
const hardcodedAddresses = Object.keys(hardcodedTokens)

const initialState: TokenState = {
  addresses: hardcodedAddresses,
  byAddress: hardcodedTokens,
  updating: false,
  fetched: false
}

function createToken(token: any) {
  return {
    name: token.name,
    symbol: token.symbol,
    address: token.address,
    decimals: token.decimals,
    protocol: null,
    chainId: token.chainId
  }
}

function createERC777(token: any): Token {
  return {
    ...createToken(token),
    type: 'erc777',
    protocol: token.protocol,
    underlyingAddress: token.underlyingAddress,
    yieldWrappers:
      token.yieldWrappers &&
      token.yieldWrappers.map((wrapper: any) => ({
        name: wrapper.underlyingName,
        symbol: wrapper.underlyingSymbol,
        address: wrapper.address,
        yieldAdapter: wrapper.yieldAdapter,
        underlyingAddress: wrapper.underlyingAddress
      }))
  }
}

function createERC20(token: any): Token {
  return { ...createToken(token), type: 'erc20' }
}

function createYieldAdapter(token: any, wrapper: any): Token {
  return {
    type: 'yield',
    decimals: 18,
    chainId: token.chainId,
    yieldAdapter: true,
    name: wrapper.underlyingName,
    symbol: wrapper.underlyingSymbol,
    address: wrapper.yieldAdapter,
    protocol: null,
    underlyingAddress: wrapper.underlyingAddress
  }
}

export default createReducer(initialState, builder =>
  builder
    .addCase(tokenFetchStarted, state => {
      state.updating = true
    })
    .addCase(tokenFetchCompleted, (state, { payload: tokens }) => {
      const addresses = [...hardcodedAddresses]

      for (const token of tokens.erc777s) {
        addresses.push(token.address)
        state.byAddress[token.address] = createERC777(token)

        for (const wrapper of token.yieldWrappers || []) {
          addresses.push(wrapper.yieldAdapter)
          state.byAddress[wrapper.yieldAdapter] = createYieldAdapter(token, wrapper)
        }
      }
      for (const token of tokens.erc20s) {
        addresses.push(token.address)
        state.byAddress[token.address] = createERC20(token)
      }
      state.addresses = addresses
      state.updating = false
      state.fetched = true
    })
    .addCase(tokenFetchFailed, state => {
      state.updating = false
    })
)
