import React, { ReactNode } from 'react'
import { Box, Grommet, BoxProps } from 'grommet'
import {Users} from './components/users/users'
type AppBarProps = BoxProps & {children: ReactNode}

const AppBar = (props: AppBarProps) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    {...props}
  />
)

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
}

function App() {
  return (
    <Grommet theme={theme}>
      <AppBar>Photo Share</AppBar>
      <Users />
    </Grommet>
  )
}

export default App
