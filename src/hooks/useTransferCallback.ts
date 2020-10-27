import { Currency, Token, CurrencyAmount } from '@uniswap/sdk'
import { useMemo } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin, getSigner, getTokenContract, toHex } from '../utils'
import { useActiveWeb3React } from './index'
import useENS from './useENS'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID
}

export function useTransferCallback(
  token?: Currency | null,
  amount?: CurrencyAmount | null, // Amount to transfer, in decimals
  recipientAddressOrName?: string | null // the ENS name or address of the recipient
): { state: SwapCallbackState; callback: null | (() => Promise<string>); error: string | null } {
  const { account, chainId, library } = useActiveWeb3React()

  const addTransaction = useTransactionAdder()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress

  return useMemo(() => {
    if (!token || !library || !account || !chainId || !amount) {
      return { state: SwapCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
    }
    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return { state: SwapCallbackState.INVALID, callback: null, error: 'Invalid recipient' }
      } else {
        return { state: SwapCallbackState.LOADING, callback: null, error: null }
      }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onTransfer(): Promise<string> {
        let call
        if (token.symbol === 'ETH') {
          const signer = getSigner(library, account)
          const ethGas = await signer.estimateGas({ value: toHex(amount), to: recipient })
          call = signer.sendTransaction({ value: toHex(amount), to: recipient, gasLimit: calculateGasMargin(ethGas) })
        } else {
          const contract = getTokenContract((token as Token).address, library, account)
          const transferGas = await contract.estimateGas.transfer(recipient, toHex(amount))
          call = contract.transfer(recipient, toHex(amount), {
            from: account,
            gasLimit: calculateGasMargin(transferGas)
          })
        }

        return call
          .then((response: any) => {
            const inputSymbol = token.symbol

            const summary = `Transfer ${amount.toFixed(2)} ${inputSymbol} to ${recipientAddressOrName}`

            addTransaction(response, { summary })

            return response.hash
          })
          .catch((error: any) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Transfer failed`, error, token, recipient)
              throw new Error(`Transfer failed: ${error.message}`)
            }
          })
      },
      error: null
    }
  }, [amount, token, library, account, chainId, recipient, recipientAddressOrName, addTransaction])
}
