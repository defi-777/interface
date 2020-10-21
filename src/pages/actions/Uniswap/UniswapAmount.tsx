import React, { useState, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { Text } from 'rebass'
import { AutoColumn } from '../../../components/Column'
import AppBody from '../../AppBody'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
import { useCurrency } from '../../../hooks/Tokens'
import { Wrapper } from '../../../components/swap/styleds'
import { TYPE } from '../../../theme'
import { Input as NumericalInput } from '../../../components/NumericalInput'
import { ButtonPrimary } from '../../../components/Button'

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

export default function UniswapAmount({
  match: {
    params: { currencyIdA, currencyIdB }
  },
  history
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const tokenIn = useCurrency(currencyIdA)
  const tokenOut = useCurrency(currencyIdB)
  const theme = useContext(ThemeContext)

  const [amount, setAmount] = useState('0')
  const [sending, setSending] = useState(false)

  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, tokenIn ?? undefined)

  const send = async () => {
    setSending(true)
    try {
      history.push(`/uniswap/sent/0x`)
    } catch (e) {}
    setSending(false)
  }

  return (
    <AppBody>
      <div>From: {tokenIn ? tokenIn.name : currencyIdA}</div>
      <div>To: {tokenOut ? tokenOut.name : currencyIdB}</div>
      <Wrapper>
        {account && selectedCurrencyBalance && (
          <TYPE.body
            onClick={() => setAmount(selectedCurrencyBalance?.toSignificant(6))}
            color={theme.text2}
            fontWeight={500}
            fontSize={14}
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            {!!tokenIn && selectedCurrencyBalance ? 'Balance: ' + selectedCurrencyBalance?.toSignificant(6) : ' -'}
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
              Swap
            </Text>
          </ButtonPrimary>
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}
