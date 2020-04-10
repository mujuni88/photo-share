import React, { ReactNode } from 'react';
import { Box, BoxProps } from 'grommet';
type AppBarProps = BoxProps & { children: ReactNode };

export const AppBar = (props: AppBarProps) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    {...props}
  />
);
