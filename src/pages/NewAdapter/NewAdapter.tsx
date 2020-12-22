import React, { useState } from 'react'
import { Text } from 'rebass'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonError, ButtonLight } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import { CardHeader } from '../../components/NavigationTabs'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useActiveWeb3React } from '../../hooks'
import { isAddress } from '../../utils'
import { useAdapterFactoryContract } from '../../hooks/useContract'
import { useAction } from '../../state/actions/hooks'
import { useToken } from '../../state/tokens/hooks'
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

const NewAdapter: React.FC<RouteComponentProps<{ actionId: string }>> = ({ match, history }) => {
  const { account } = useActiveWeb3React()
  const error = false
  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected
  const [address, setAddress] = useState('')
  const action = useAction(match.params.actionId)
  const adapterFactoryContract = useAdapterFactoryContract(action?.factory?.address)
  const addTransaction = useTransactionAdder()
  const tokenAddress = isAddress(address)
  const token = useToken(tokenAddress || undefined)

  const create = async () => {
    if (!action || !adapterFactoryContract) {
      return
    }

    const tx = await adapterFactoryContract.createAdapter(address)
    const summary = `Create ${action.name} adapter for ${token!.name}`
    addTransaction(tx, { summary })

    history.push(`/sent/${tx.hash}`)
  }

  return (
    <AppBody>
      <CardHeader
        back="/adapters"
        title={`New ${action ? action.name : ''} Adapter`}
        help="Creates a new adapter that can receive ERC-777 tokens and execute actions"
      />
      <Wrapper>
        <AutoColumn gap="20px">
          <InputRow>
            <AddressInputPanel
              value={address}
              onChange={setAddress}
              label="DeFi777 Wrapper Token Address"
              placeholder="0x..."
            />
          </InputRow>

          {!account ? (
            <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
          ) : (
            <AutoColumn gap={'md'}>
              <ButtonError onClick={create} disabled={!token || token.type !== 'erc777'} error={!!error}>
                <Text fontSize={20} fontWeight={500}>
                  {error || 'Create Adapter'}
                </Text>
              </ButtonError>
            </AutoColumn>
          )}
        </AutoColumn>
      </Wrapper>
    </AppBody>
  )
}

export default NewAdapter
