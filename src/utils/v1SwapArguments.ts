import { SwapParameters } from '@uniswap/sdk'

/**
 * Get the arguments to make for a swap
 * @param trade trade to get v1 arguments for swapping
 * @param options options for swapping
 */
export default function v1SwapArguments(): SwapParameters {
  return {
    methodName: 'ethToTokenTransferInput',
    args: [],
    value: 'maximumAmountIn'
  }
}
