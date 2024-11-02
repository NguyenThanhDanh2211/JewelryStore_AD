import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addProduct } from '../../services/productService';

function AddProduct() {
  const [mess, setMess] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productId: '',
    name: '',
    price: '',
    discount: '',
    image: [],
    category: '',
    tag: '',
    collect: '',
    description: '',
    detail: '',
    stoneMain: '',
    stoneSecond: '',
    men: false,
  });

  const [error, setError] = useState(null);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setNewProduct({ ...newProduct, image: files });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    Object.keys(newProduct).forEach((key) => {
      if (key === 'image') {
        newProduct.image.forEach((file) => formData.append('images', file));
      } else {
        formData.append(key, newProduct[key]);
      }
    });

    try {
      await addProduct(formData);
      setMess('them san pham thanh cong');
      setAlertOpen(true);
      setNewProduct({
        // productId: '',
        name: '',
        price: '',
        discount: '',
        image: [],
        category: '',
        tag: '',
        collect: '',
        description: '',
        detail: '',
        stoneMain: '',
        stoneSecond: '',
        men: false,
      });
    } catch (error) {
      setError('Failed to add product');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      p={3}
      bgcolor="#f9fafb"
      borderRadius={4}
      boxShadow={3}
    >
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {mess}
        </Alert>
      </Snackbar>
      <Typography variant="h5" gutterBottom my={3}>
        Products {'>'} Add New Product
      </Typography>
      <Grid container spacing={3}>
        {/* Product ID */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Product ID"
            name="productId"
            fullWidth
            variant="outlined"
            value={newProduct.productId}
            onChange={handleChange}
          />
        </Grid>

        {/* Product Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Product Name"
            name="name"
            fullWidth
            variant="outlined"
            value={newProduct.name}
            onChange={handleChange}
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Price"
            name="price"
            fullWidth
            variant="outlined"
            value={newProduct.price}
            onChange={handleChange}
          />
        </Grid>

        {/* Discount */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Discount"
            name="discount"
            fullWidth
            variant="outlined"
            value={newProduct.discount}
            onChange={handleChange}
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="Rings">Rings</MenuItem>
              <MenuItem value="Necklaces">Necklaces</MenuItem>
              <MenuItem value="Earrings">Earrings</MenuItem>
              <MenuItem value="Bracelets">Bracelets</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Tag (Material) */}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel>Material</InputLabel>
            <Select
              name="tag"
              value={newProduct.tag}
              onChange={handleChange}
              label="Material"
            >
              <MenuItem value="Golden">Golden</MenuItem>
              <MenuItem value="Silver">Silver</MenuItem>
              <MenuItem value="Diamond">Diamond</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Collect */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Collection"
            name="collect"
            fullWidth
            variant="outlined"
            value={newProduct.collect}
            onChange={handleChange}
          />
        </Grid>

        {/* Men (Checkbox) */}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Men's Collection</InputLabel>
            <Select
              name="men"
              value={newProduct.men}
              onChange={handleChange}
              label="Men's Collect"
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Image Upload */}
        <Grid item xs={12}>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: 16, marginBottom: 16 }}
          />
        </Grid>

        {/* Detail */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Detail"
            name="detail"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={newProduct.detail}
            onChange={handleChange}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={newProduct.description}
            onChange={handleChange}
          />
        </Grid>

        {/* Error Display */}
        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddProduct;
