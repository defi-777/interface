import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Action from './Action'
import Adapters from './Adapters'
import Claim from './Claim'
import Wallet from './Wallet'
import Token from './Token'
import Wrap from './Wrap'
import NewAdapter from './NewAdapter'
import NewWrapper from './NewWrapper'
import Wrappers from './Wrappers'
import SendPage from './Send'
import SentPage from './Sent'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          <Polling />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/wallet" component={Wallet} />
              <Route exact strict path="/token/:address" component={Token} />
              <Route path="/action/:actionId/:currencyId/:adapter?" component={Action} />
              <Route path="/wrap/:currencyIdA" component={Wrap} />
              <Route path="/claim/:adapterAddress" component={Claim} />
              <Route path="/send/:token" component={SendPage} />
              <Route path="/sent/:txHash" component={SentPage} />
              <Route path="/adapters/new/:actionId" component={NewAdapter} />
              <Route path="/adapters" component={Adapters} />
              <Route path="/wrappers/new" component={NewWrapper} />
              <Route exact strict path="/wrappers" component={Wrappers} />
              <Redirect to="/wallet" />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}
