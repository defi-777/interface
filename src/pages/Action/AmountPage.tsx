import { Action, Adapter } from '../../state/actions/types'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import AppBody from '../AppBody'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { Wrapper } from '../../components/swap/styleds'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../../components/NumericalInput'
import { ButtonPrimary } from '../../components/Button'
import { useTransferCallback } from '../../hooks/useTransferCallback'
import useENSName from '../../hooks/useENSName'
import { tryParseAmount } from '../../state/swap/hooks'
import { CardHeader } from '../../components/NavigationTabs'
import { tokenToCurrency } from '../../state/tokens/utils'
import { Token } from '../../state/tokens/types'

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: '0.75rem 0.75rem 0.75rem 1rem';
`

const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryText1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

interface AmountPageProps {
  action: Action
  adapter: Adapter
  token: Token
}

const help =
  'DeFi actions are executed by sending your tokens to a specific address. ' +
  'You can send these tokens using this dapp, or from any other wallet.'

const AmountPage: React.FC<AmountPageProps> = ({ action, adapter, token }) => {
  const theme = useContext(ThemeContext)
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
        {account && selectedCurrencyBalance && (
          <TYPE.body
            onClick={() => setAmount(selectedCurrencyBalance?.toSignificant(6))}
            color={theme.text2}
            fontWeight={500}
            fontSize={14}
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            {!!currency && selectedCurrencyBalance ? 'Balance: ' + selectedCurrencyBalance?.toSignificant(6) : ' -'}
          </TYPE.body>
        )}
        <AutoColumn gap={'md'}>
          <InputRow>
            <NumericalInput className="token-amount-input" value={amount} onUserInput={val => setAmount(val)} />
            {account && selectedCurrencyBalance && (
              <StyledBalanceMax onClick={() => setAmount(selectedCurrencyBalance?.toSignificant(6))}>
                MAX
              </StyledBalanceMax>
            )}
          </InputRow>

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
