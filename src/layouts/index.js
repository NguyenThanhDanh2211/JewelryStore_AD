import React from 'react';
import { styled, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Nav from '../components/Nav/Nav';

const LayoutContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#f9fafb',
  height: 'auto',
  top: 0,
}));

const ContentContainer = styled(Stack)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  marginLeft: '240px',
  marginTop: '65px',
  height: 'auto',
  backgroundColor: '#f9fafb',
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
