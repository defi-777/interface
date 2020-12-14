import React, { useState, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { Text } from 'rebass'
import { signDaiPermit, signERC2612Permit } from 'eth-permit'
import { AutoColumn } from '../../components/Column'
import AppBody from '../AppBody'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { toHex, getWrapperContract } from '../../utils'
import { PermitType, getPermitType } from '../../utils/permit'
import { useCurrency } from '../../hooks/Tokens'
import { Wrapper } from '../../components/swap/styleds'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../../components/NumericalInput'
import { tryParseAmount } from '../../state/swap/hooks'
import { useAddressBookContract } from '../../hooks/useContract'
import { ButtonError, ButtonConfirmed } from '../../components/Button'
import { RowBetween } from '../../components/Row'
import { Dots } from '../../components/swap/styleds'
import useIsArgentWallet from '../../hooks/useIsArgentWallet'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { useWrapperAddress } from '../../hooks/useWrapper'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { CardHeader } from '../../components/NavigationTabs'

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

interface SignatureData {
  v: number
  r: string
  s: string
  deadline: string
  nonce?: number
}

export default function Wrap({
  match: {
    params: { currencyIdA }
  },
  history
}: RouteComponentProps<{ currencyIdA: string }>) {
  const tokenIn = useCurrency(currencyIdA)
  const theme = useContext(ThemeContext)

  const [amount, _setAmount] = useState('0')
  const [wrapping, setWrapping] = useState(false)

  const { account, library } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, tokenIn ?? undefined)

  const addressBookContract = useAddressBookContract()
  const addTransaction = useTransactionAdder()

  const tokenAmount = tryParseAmount(amount, tokenIn ?? undefined)

  const wrapperAddress = useWrapperAddress(currencyIdA)

  const [signatureData, setSignatureData] = useState<SignatureData | null>(null)
  const [approval, approveCallback] = useApproveCallback(tokenAmount, wrapperAddress)

  const setAmount = (newAmount: string) => {
    _setAmount(newAmount)
    setSignatureData(null)
  }

  const isArgentWallet = useIsArgentWallet()

  const approve = async () => {
    if (!library || !addressBookContract || !account) throw new Error('missing dependencies')
    if (!tokenAmount) throw new Error('missing liquidity amount')

    if (isArgentWallet) {
      return approveCallback()
    }

    const wrapperAddress = await addressBookContract.calculateWrapperAddress(currencyIdA)

    const permitType = await getPermitType(currencyIdA, library)

    try {
      if (permitType === PermitType.DAI) {
        const result = await signDaiPermit(library.provider, currencyIdA, account, wrapperAddress)
        const deadline = result.expiry.toString() // Type assertion
        setSignatureData({ v: result.v, r: result.r, s: result.s, deadline, nonce: result.nonce })
      } else if (permitType === PermitType.ERC2612) {
        const amountWei = toHex(tokenAmount)
        const result = await signERC2612Permit(library.provider, currencyIdA, account, wrapperAddress, amountWei)
        const deadline = result.deadline.toString() // Type assertion
        setSignatureData({ v: result.v, r: result.r, s: result.s, deadline, nonce: 0 })
      } else {
        return approveCallback()
      }
    } catch (error) {
      if (error?.code !== 4001) {
        return approveCallback()
      }
    }
  }

  const wrap = async () => {
    if (!addressBookContract || !library || !account || !tokenAmount || !tokenIn) {
      return
    }
    setWrapping(true)
    try {
      const wrapperAddress = await addressBookContract.calculateWrapperAddress(currencyIdA)
      const wrapper = getWrapperContract(wrapperAddress, library, account)

      let tx
      if (signatureData) {
        const { deadline, nonce, v, r, s } = signatureData
        tx = await wrapper.wrapWithPermit(toHex(tokenAmount), deadline, nonce, v, r, s)
      } else {
        tx = await wrapper.wrap(toHex(tokenAmount))
      }
      const summary = `Wrap ${tokenAmount.toFixed(2)} ${tokenIn.symbol}`
      addTransaction(tx, { summary })

      history.push(`/sent/${tx.hash}`)
    } catch (e) {
      console.error(e)
    }
    setWrapping(false)
  }

  return (
    <AppBody>
      <CardHeader
        back={`/token/${currencyIdA}`}
        title={`Wrap ${tokenIn ? tokenIn.name : 'tokens'}`}
        help="Wrapping ERC-20 tokens into DeFi777 tokens lets you easily use them in DeFi protocols"
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

          <RowBetween>
            <ButtonConfirmed
              onClick={approve}
              confirmed={approval === ApprovalState.APPROVED || signatureData !== null}
              disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
              mr="0.5rem"
              fontWeight={500}
              fontSize={16}
            >
              {approval === ApprovalState.PENDING ? (
                <Dots>Approving</Dots>
              ) : approval === ApprovalState.APPROVED || signatureData !== null ? (
                'Approved'
              ) : (
                'Approve'
              )}
            </ButtonConfirmed>
            <ButtonError
              onClick={wrap}
              disabled={(signatureData === null && approval !== ApprovalState.APPROVED) || wrapping}
              error={false}
            >
              <Text fontSize={16} fontWeight={500}>
                Wrap
              </Text>
            </ButtonError>
          </RowBetween>
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}
