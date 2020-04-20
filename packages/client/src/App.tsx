import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import { grommet as theme } from 'grommet/themes'
import { UsersPage } from './pages/users-page/users-page'
import { AuthorizedUser } from './components/authorized-user'

export default function App() {
  return (
    <Grommet theme={theme} full>
      <Router>
        <Route path="/" component={AuthorizedUser} />
        <Route path="/" component={UsersPage} />
      </Router>
    </Grommet>
  )
}
