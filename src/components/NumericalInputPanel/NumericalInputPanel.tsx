import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { CurrencyAmount } from '@uniswap/sdk'
import { Input as NumericalInput } from '../NumericalInput'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { darken } from 'polished'

const Container = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
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

interface NumericalInputPanelProps {
  value: string
  onChange: (newVal: string) => void
  max?: CurrencyAmount
}

const NumericalInputPanel: React.FC<NumericalInputPanelProps> = ({ value, onChange, max }) => {
  const onMax = max ? () => onChange(max.toSignificant(6)) : undefined
  const theme = useContext(ThemeContext)

  return (
    <Container>
      <LabelRow>
        <RowBetween>
          <TYPE.body
            onClick={onMax}
            color={theme.text2}
            fontWeight={500}
            fontSize={14}
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            {max ? `Balance: ${max?.toSignificant(6)}` : '-'}
          </TYPE.body>
        </RowBetween>
      </LabelRow>

      <InputRow>
        <NumericalInput value={value} onUserInput={val => onChange(val)} />
        {max && <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>}
      </InputRow>
    </Container>
  )
}

export default NumericalInputPanel
