import React from 'react'
import { LightCard } from '../../components/Card'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
`

const Adapters: React.FC = () => {
  return (
    <Wrapper>
      <LightCard>Coming Soon...</LightCard>
    </Wrapper>
  )
}

export default Adapters
