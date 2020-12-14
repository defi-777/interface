import React, { useState } from 'react'
import { Text } from 'rebass'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonError, ButtonLight } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import { CardHeader } from '../../components/NavigationTabs'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useActiveWeb3React } from '../../hooks'
import styled from 'styled-components'
import { useWrapperFactoryContract } from '../../hooks/useContract'
import { useAnyToken } from '../../hooks/Tokens'
import AppBody from '../AppBody'
import { useTransactionAdder } from '../../state/transactions/hooks'

import AddressInputPanel from '../../components/AddressInputPanel'

export const Wrapper = styled.div`
  position: relative;
`

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: '0.75rem 0.75rem 0.75rem 1rem';
`

const NewWrapper: React.FC<RouteComponentProps> = ({ history }) => {
  const { account } = useActiveWeb3React()
  const error = false
  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected
  const [address, setAddress] = useState('')
  const wrapperFactoryContract = useWrapperFactoryContract()
  const token = useAnyToken(address)
  const addTransaction = useTransactionAdder()

  const create = async () => {
    if (!token || !wrapperFactoryContract) {
      return
    }

    const tx = await wrapperFactoryContract.createWrapper(address)
    const summary = `Create wrapper for ${token!.name}`
    addTransaction(tx, { summary })

    history.push(`/sent/${tx.hash}`)
  }

  return (
    <AppBody>
      <CardHeader
        back="/wrappers"
        title="New Wrapper"
        help="Creates a new ERC-777 wrapper for an existing ERC-20 token"
      />
      <Wrapper>
        <AutoColumn gap="20px">
          <InputRow>
            <AddressInputPanel value={address} onChange={setAddress} label="Token Address" placeholder="0x..." />
          </InputRow>

          {!account ? (
            <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
          ) : (
            <AutoColumn gap={'md'}>
              <ButtonError onClick={create} disabled={!token} error={!!error}>
                <Text fontSize={20} fontWeight={500}>
                  {error || 'Create Wrapper'}
                </Text>
              </ButtonError>
            </AutoColumn>
          )}
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}

export default NewWrapper
