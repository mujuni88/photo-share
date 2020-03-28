import React from 'react'
import { Grommet } from 'grommet'
import { grommet as theme } from 'grommet/themes'
import { UsersPage } from './pages/users-page/users-page'
function App() {
  return (
    <Grommet theme={theme} full>
      <UsersPage />
    </Grommet>
  )
}

export default App
