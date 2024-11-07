import { Link } from 'react-router-dom';

import {
  List,
  Stack,
  styled,
  ListItemText,
  ListItem,
  ListItemButton,
  Box,
} from '@mui/material';

import { Dashboard } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import DiscountIcon from '@mui/icons-material/Discount';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const SidebarContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  paddingTop: theme.spacing(3),
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f5f7fa',
  height: '100vh',
  width: '250px',
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
            <Box mr={2}>
              <Dashboard />
            </Box>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/products">
            <Box mr={2}>
              <CategoryIcon />
            </Box>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/order">
            <Box mr={2}>
              <AddShoppingCartIcon />
            </Box>
            <ListItemText primary="Order" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/discount">
            <Box mr={2}>
              <DiscountIcon />
            </Box>
            <ListItemText primary="Discount" />
          </ListItemButton>
        </ListItem>
      </List>
    </SidebarContainer>
  );
}

export default Sidebar;
