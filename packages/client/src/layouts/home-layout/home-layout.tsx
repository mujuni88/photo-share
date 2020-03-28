import React, { ReactNode } from 'react'
import { Box } from 'grommet'

type HomeLayoutProps = {
  children: ReactNode
}
export const HomeLayout = ({ children }: HomeLayoutProps) => (
  <Box pad="large">{children}</Box>
)
