import {
  List,
  Stack,
  styled,
  ListItemText,
  ListItem,
  ListItemButton,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const SidebarContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  paddingTop: theme.spacing(3),
  flexDirection: 'column',
  alignItems: 'center', // Đảm bảo căn giữa theo chiều ngang
  height: '100vh',
  width: '240px',
  border: '1px solid #000',
  position: 'fixed',
  top: 0,
  left: 0,
}));

function Sidebar() {
  return (
    <SidebarContainer>
      <Box
        display="flex"
        alignItems="center"
        component="img"
        src="https://websitedemos.net/jewellery-store-04/wp-content/uploads/sites/935/2021/08/logo-regular.png"
        alt="JS"
        height="auto"
        width="150px"
      />
      <List sx={{ width: '100%' }}>
        <ListItem>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/products">
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/order">
            <ListItemText primary="Order" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/discount">
            <ListItemText primary="Discount" />
          </ListItemButton>
        </ListItem>
      </List>
    </SidebarContainer>
  );
}

export default Sidebar;
