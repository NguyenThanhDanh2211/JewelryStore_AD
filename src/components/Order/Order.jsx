import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from '@mui/material';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusMap, setStatusMap] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders', error);
        setError('Failed to load orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusMap((prevStatusMap) => ({
      ...prevStatusMap,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    const status = statusMap[orderId];
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: status } : order
        )
      );
      // Show success Snackbar
      setSnackbarMessage('Order status updated successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating order status', error);
      // Show error Snackbar
      setSnackbarMessage('Failed to update order status');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>
      {orders.length > 0 ? (
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {order._id}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Customer:</strong> {order.customer.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Items:</strong> {order.items.length}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Total:</strong> $
                    {(order.totalPrice ? order.totalPrice : 0).toLocaleString(
                      'en-US',
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Status:</strong> {order.status}
                  </Typography>

                  {/* Dropdown to update order status */}
                  <Select
                    value={statusMap[order._id] || order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    displayEmpty
                    fullWidth
                    sx={{ marginTop: '10px' }}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="canceled">Canceled</MenuItem>
                  </Select>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleUpdateStatus(order._id)}
                    sx={{ marginTop: '10px' }}
                  >
                    Update Status
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No orders available</Typography>
      )}

      {/* Snackbar to show feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Order;
