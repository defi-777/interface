import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import UniswapOutputSelection from './UniswapOutputSelection'
import UniswapAmount from './UniswapAmount'
import UniswapSent from './UniswapSent'

export default function Uniswap() {
  return (
    <Switch>
      <Route exact path="/uniswap/sent/:txHash" component={UniswapSent} />
      <Route exact path="/uniswap/:currencyIdA/:currencyIdB" component={UniswapAmount} />
      <Route exact path="/uniswap/:currencyIdA" component={UniswapOutputSelection} />
      <Redirect to="/swap" />
    </Switch>
  )
}
