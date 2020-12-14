import React, { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import AppBody from '../AppBody'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { Wrapper } from '../../components/swap/styleds'
import NumericalInputPanel from '../../components/NumericalInputPanel'
import { ButtonPrimary } from '../../components/Button'
import { useTransferCallback } from '../../hooks/useTransferCallback'
import { tryParseAmount } from '../../state/swap/hooks'
import { useCurrency } from '../../hooks/Tokens'
import AddressInputPanel from '../../components/AddressInputPanel'
import useENS from '../../hooks/useENS'
import { CardHeader } from '../../components/NavigationTabs'

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: '0.75rem 0.75rem 0.75rem 1rem';
`

const SendPage: React.FC<RouteComponentProps<{ token: string }>> = ({ match, history }) => {
  const currency = useCurrency(match.params.token)

  const [amount, setAmount] = useState('0')
  const [sending, setSending] = useState(false)
  const [recipient, setRecipient] = useState('')

  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const { address: recipientAddress } = useENS(recipient)
  const tokenAmount = tryParseAmount(amount, currency ?? undefined)
  const { callback: transferCallback } = useTransferCallback(currency, tokenAmount, recipientAddress)

  const disabled = !amount || sending || !recipientAddress || parseFloat(amount) === 0

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

  if (!currency) return null

  return (
    <AppBody>
      <CardHeader
        back={`/token/${match.params.token}`}
        title={`Send ${currency ? currency.name : 'tokens'}`}
        help=" "
      />

      <Wrapper>
        <AutoColumn gap={'md'}>
          <NumericalInputPanel max={selectedCurrencyBalance} value={amount} onChange={setAmount} />

          <InputRow>
            <AddressInputPanel value={recipient} onChange={setRecipient} />
          </InputRow>

          <ButtonPrimary onClick={send} disabled={disabled}>
            <Text fontSize={16} fontWeight={500}>
              Send
            </Text>
          </ButtonPrimary>
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}

export default SendPage
