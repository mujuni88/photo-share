import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import {AuthorizedUser} from './components/authorized-user'

export const Routes = () => (
  <Router>
    <Route path="/" component={AuthorizedUser} />
    <Route path="/home" component={App} />
  </Router>
)
