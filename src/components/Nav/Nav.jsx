import { Stack, styled, Box, Typography } from '@mui/material';
import AdminAvt from '../../assets/admin-icon-png-17.jpg';

const NavContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginLeft: '243px',
  height: '70px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(7px)',
  width: 'calc(100% - 230px)',
  zIndex: 1000,
  top: 0,
  paddingRight: '10px',
}));

const Avatar = styled('img')({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginLeft: '8px',
});

function Nav() {
  return (
    <NavContainer>
      <Box
        sx={{ display: 'flex', alignItems: 'center', ml: 'auto', mr: '70px' }}
      >
        <Typography variant="h6">Welcome back </Typography>
        <Avatar src={AdminAvt} alt="Admin Avatar" />
      </Box>
    </NavContainer>
  );
}

export default Nav;
