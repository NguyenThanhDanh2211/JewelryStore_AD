import { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { create, getAllDiscount, remove } from '../../services/discountService';

function Discount() {
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    code: '',
    percent: '',
    valid: '',
  });
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await create(newDiscount);

      setDiscounts((prevDiscounts) => [
        ...prevDiscounts,
        { ...newDiscount, _id: response._id, endDate: response.endDate },
      ]);

      setMessage('Discount added successfully!');
      setOpen(true);

      setNewDiscount({
        code: '',
        percent: '',
        valid: '',
      });
    } catch (error) {
      console.log('Error adding new discount:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      setDiscounts(discounts.filter((discount) => discount._id !== id));
      setMessage('Discount deleted successfully!');
      setOpen(true);
    } catch (error) {
      console.log('Error deleting discount:', error);
    }
  };

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await getAllDiscount();
        setDiscounts(response);
      } catch (error) {
        console.log('Error fetching Discount', error);
      }
    };

    fetchDiscount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Input form for new discount */}
      <Typography variant="h5" gutterBottom>
        Add Discount
      </Typography>
      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Discount Code"
              name="code"
              fullWidth
              variant="outlined"
              value={newDiscount.code}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Discount Percent"
              name="percent"
              type="number"
              fullWidth
              variant="outlined"
              value={newDiscount.percent}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Valid Date"
              name="valid"
              type="text"
              fullWidth
              variant="outlined"
              value={newDiscount.valid}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<AddIcon />}
            >
              Save Discount
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar for feedback message */}
      <Snackbar
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        message={message}
        autoHideDuration={4000}
        key={'topright'}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

      {/* Discount Grid */}
      <Typography variant="h5" gutterBottom>
        All Discounts
      </Typography>
      {discounts.length > 0 ? (
        <Grid container spacing={3}>
          {discounts.map((discount) => (
            <Grid item xs={12} sm={6} md={3} key={discount._id}>
              <Box
                p={3}
                bgcolor="#f9fafb"
                borderRadius={4}
                boxShadow={3}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography variant="h6" gutterBottom>
                  {discount.code}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Discount Amount: {discount.percent}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Expiry Date: {new Date(discount.endDate).toLocaleDateString()}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(discount._id)}
                  style={{ marginTop: '16px' }}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No discounts</p>
      )}
    </>
  );
}

export default Discount;
