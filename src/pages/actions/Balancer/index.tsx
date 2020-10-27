import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import BalancerPoolAmount from './BalancerPoolAmount'
import BalancerPoolSelection from './BalancerPoolSelection'

export default function Balancer() {
  return (
    <Switch>
      <Route exact path="/balancer-pool/:currencyIdA/:poolAdapter" component={BalancerPoolAmount} />
      <Route exact path="/balancer-pool/:currencyIdA" component={BalancerPoolSelection} />
      <Redirect to="/swap" />
    </Switch>
  )
}
