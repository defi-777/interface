import React from 'react'
import { tokenToCurrency } from '../../state/tokens/utils'
import CurrencyLogo from '../CurrencyLogo'
import { useToken } from '../../state/tokens/hooks'
import { Token } from '../../state/tokens/types'
import styled from 'styled-components'
import wrapperIcon from '../../assets/svg/outline.svg'
import tractor from '../../assets/svg/tractor.svg'

const Overlay = styled.div`
  position: relative;
  &:before {
    content: '';
    z-index: 1;
    position: absolute;
    bottom: -10%;
    right: -20%;
    height: 70%;
    width: 70%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0 center;
  }
`

const WrapperOverlay = styled(Overlay)`
  &:before {
    background-image: url('${wrapperIcon}');
    width: 90%;
  }
`

const YieldOverlay = styled(Overlay)`
  &:before {
    background-image: url('${tractor}');
  }
`

interface TokenIconProps {
  token?: Token
  size?: number
  style?: any
}

const TokenIcon: React.FC<TokenIconProps> = ({ token, size, style }) => {
  const underlyingToken = useToken(token?.underlyingAddress)

  if (!token) {
    // TODO: question mark
    return null
  }

  if (token.type === 'erc777' && underlyingToken) {
    const currency = tokenToCurrency(underlyingToken)
    return (
      <WrapperOverlay style={style}>
        <CurrencyLogo currency={currency} size={`${size}px`} />
      </WrapperOverlay>
    )
  }

  if (token.type === 'yield' && underlyingToken) {
    const currency = tokenToCurrency(underlyingToken)
    return (
      <YieldOverlay style={style}>
        <CurrencyLogo currency={currency} size={`${size}px`} />
      </YieldOverlay>
    )
  }

  const currency = tokenToCurrency(token)
  return <CurrencyLogo currency={currency} size={`${size}px`} style={style} />
}

TokenIcon.defaultProps = {
  size: 24
}

export default TokenIcon
