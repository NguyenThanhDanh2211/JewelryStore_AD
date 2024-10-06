import React from 'react';
import { styled, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Nav from '../components/Nav/Nav';

const LayoutContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  marginLeft: '240px',
  marginTop: '5px',
  border: '1px solid #000',
}));

function Layout({ children }) {
  return (
    <LayoutContainer>
      <Sidebar />
      <Nav />
      <ContentContainer>{children}</ContentContainer>
    </LayoutContainer>
  );
}

export default Layout;
