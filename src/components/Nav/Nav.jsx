import { Stack, styled } from '@mui/material';

const NavContainer = styled(Stack)(({ theme }) => ({
  marginLeft: '240px',
  height: '150px',
  border: '1px solid #000',
}));

function Nav() {
  return (
    <NavContainer>
      <h1>hello</h1>
      <h1>Admin</h1>
    </NavContainer>
  );
}

export default Nav;
