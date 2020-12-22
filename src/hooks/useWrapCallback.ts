// import { Currency } from '@uniswap/sdk'
// import { tryParseAmount } from '../state/swap/hooks'
// import { useTransactionAdder } from '../state/transactions/hooks'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(): {
  wrapType: WrapType
  execute?: undefined | (() => Promise<void>)
  inputError?: string
} {
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  // const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  // const addTransaction = useTransactionAdder()

  return NOT_APPLICABLE
}
