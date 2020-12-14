import { Action, Adapter } from '../../state/actions/types'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import AppBody from '../AppBody'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { Wrapper } from '../../components/swap/styleds'
import { ButtonPrimary } from '../../components/Button'
import { useTransferCallback } from '../../hooks/useTransferCallback'
import useENSName from '../../hooks/useENSName'
import { tryParseAmount } from '../../state/swap/hooks'
import { CardHeader } from '../../components/NavigationTabs'
import { tokenToCurrency } from '../../state/tokens/utils'
import { Token } from '../../state/tokens/types'
import NumericalInputPanel from '../../components/NumericalInputPanel'

interface AmountPageProps {
  action: Action
  adapter: Adapter
  token: Token
}

const help =
  'DeFi actions are executed by sending your tokens to a specific address. ' +
  'You can send these tokens using this dapp, or from any other wallet.'

const AmountPage: React.FC<AmountPageProps> = ({ action, adapter, token }) => {
  const history = useHistory()

  const [amount, setAmount] = useState('0')
  const [sending, setSending] = useState(false)

  const { account } = useActiveWeb3React()
  const currency = tokenToCurrency(token)
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const tokenAmount = tryParseAmount(amount, currency)
  const { callback: transferCallback } = useTransferCallback(currency, tokenAmount, adapter.address)
  const { ENSName } = useENSName(adapter.address)

  const send = async () => {
    if (!transferCallback) {
      return
    }

    setSending(true)
    try {
      const hash = await transferCallback()
      history.push(`/sent/${hash}`)
    } catch (e) {
      console.error(e)
    }
    setSending(false)
  }

  return (
    <AppBody>
      <CardHeader
        back={action.adapters.length === 1 ? `/token/${token.address}` : `/action/${action.id}/${token.address}`}
        title={`Sending ${token.name} to ${ENSName || action.name}`}
        help={help}
      />
      <Wrapper>
        <AutoColumn gap={'md'}>
          <NumericalInputPanel max={selectedCurrencyBalance} value={amount} onChange={setAmount} />

          <ButtonPrimary onClick={send} disabled={!amount || sending || parseFloat(amount) === 0}>
            <Text fontSize={16} fontWeight={500}>
              Send
            </Text>
          </ButtonPrimary>
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}

export default AmountPage
