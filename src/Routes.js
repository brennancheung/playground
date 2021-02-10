import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { RouteWithLayout } from './layout/RouteWithLayout'
import { MainLayout } from './layout/MainLayout'
import { MinimalLayout } from './layout/MinimalLayout'

import { About } from './pages/About'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Widgets } from './pages/Widgets'
import { Docs } from './pages/Docs'

const NotFound = () => <h1>Not found</h1>

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <RouteWithLayout component={About} exact layout={MainLayout} path="/about" />
        <RouteWithLayout component={Docs} exact layout={MainLayout} path="/docs" />
        <RouteWithLayout component={Profile} exact layout={MainLayout} path="/profile" />
        <RouteWithLayout component={Widgets} exact layout={MainLayout} path="/widgets" />
        <RouteWithLayout component={Home} exact layout={MainLayout} path="/" />
        <RouteWithLayout component={NotFound} exact layout={MinimalLayout} path="/not-found-cover" />
        <Redirect to="/not-found-cover" status="404" />
        <Redirect exact from="/" to="/home" />
      </Switch>
    </Router>
  )
}
