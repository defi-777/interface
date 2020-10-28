import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import BalancerPoolAmount from './BalancerPoolAmount'
import BalancerPoolSelection from './BalancerPoolSelection'
import BalancerExitSelection from './BalancerExitSelection'

export default function Balancer() {
  return (
    <Switch>
      <Route exact path="/balancer-pool/:currencyIdA/:poolAdapter" component={BalancerPoolAmount} />
      <Route exact path="/balancer-exit/:currencyIdA/:poolAdapter" component={BalancerPoolAmount} />
      <Route exact path="/balancer-pool/:currencyIdA" component={BalancerPoolSelection} />
      <Route exact path="/balancer-exit/:currencyIdA" component={BalancerExitSelection} />
      <Redirect to="/swap" />
    </Switch>
  )
}
