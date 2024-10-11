import { Stack, styled, Typography } from '@mui/material';

const NavContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  justifyContent: 'center',
  marginLeft: '243px',
  height: '70px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(7px)',
  width: 'calc(100% - 230px)',
  zIndex: 1000,
  border: '1px solid #000',
  top: 0,
}));

function Nav() {
  return (
    <NavContainer>
      <Typography variant="h4" ml={3}>
        hello, Admin
      </Typography>
    </NavContainer>
  );
}

export default Nav;
