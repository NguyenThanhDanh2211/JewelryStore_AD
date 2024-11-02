import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../../services/productService';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function UpdateProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        setProduct(response);
        setUpdatedProduct(response);
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await updateProduct(slug, updatedProduct); // Ensure updateProduct accepts slug and updated data
      alert('Product updated successfully!');
    } catch (error) {
      console.log('Error updating product:', error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      p={3}
      bgcolor="#f9fafb"
      borderRadius={4}
      boxShadow={3}
    >
      <Typography variant="h4" gutterBottom>
        Update Product
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Product Name"
            name="name"
            fullWidth
            variant="outlined"
            value={updatedProduct.name || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Price"
            name="price"
            fullWidth
            variant="outlined"
            value={updatedProduct.price || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Discount"
            name="discount"
            fullWidth
            variant="outlined"
            value={updatedProduct.discount || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={updatedProduct.category || ''}
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

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Material</InputLabel>
            <Select
              name="tag"
              value={updatedProduct.tag || ''}
              onChange={handleChange}
              label="Material"
            >
              <MenuItem value="Golden">Golden</MenuItem>
              <MenuItem value="Silver">Silver</MenuItem>
              <MenuItem value="Diamond">Diamond</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <TextField
            label="Collection"
            name="collect"
            multiline
            fullWidth
            variant="outlined"
            value={updatedProduct.collect || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Men's Collection</InputLabel>
            <Select
              name="men"
              value={updatedProduct.men}
              onChange={handleChange}
              label="Men's Collect"
            >
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Detail"
            name="detail"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={updatedProduct.detail || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={updatedProduct.description || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            Update Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UpdateProduct;
