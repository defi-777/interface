import React, { ComponentType } from 'react'
import { Package, Send } from 'react-feather'
import { HelpCircle } from 'react-feather'
import Logo from '../../components/Logo'
import Unwrap from '../../assets/icons/unwrap'
import aave from '../../assets/svg/aave-icon.svg'
import balancer from '../../assets/svg/balancer-icon.svg'
import compound from '../../assets/svg/compound-logo.svg'
import curve from '../../assets/svg/curve-icon.svg'
import uniswap from '../../assets/svg/uniswap-icon.svg'
import yearn from '../../assets/svg/yearn-icon.svg'
import styled from 'styled-components'

const iconComponents: { [id: string]: ComponentType<any> } = {
  send: Send,
  unwrap: Unwrap,
  wrap: Package
}

const StyledLogo = styled(Logo)`
  height: 24px;
  width: 24px;
`

const iconImages: { [id: string]: string } = {
  aave,
  'aave-exit': aave,
  balancer,
  'balancer-pool': balancer,
  compound,
  curve,
  uniswap,
  'uniswap-pool': uniswap,
  yearn
}

const ActionIcon: React.FC<{ id: string }> = ({ id }) => {
  if (iconComponents[id]) {
    const Icon = iconComponents[id]
    return <Icon />
  }

  if (iconImages[id]) {
    return <StyledLogo srcs={[iconImages[id]]} />
  }

  return <HelpCircle size={'24px'} />
}

export default ActionIcon
