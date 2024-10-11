import { useEffect, useState } from 'react';
import { addProduct, getAllProduct } from '../../services/productService';
import { Grid, Box, Typography, Button, Link } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import ProductCardComponent from '../ProductCard';

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProduct();
        setProducts(response);
      } catch (error) {
        console.log('Error fetching all products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box>
      <Box my={3}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="h5">Products</Typography>
          </Grid>
          <Grid
            item
            xs={5.75}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Link href="/product-add">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add Product
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        {products.map((product) => (
          <Grid item xs={12} sm={7} md={3} key={product._id}>
            <ProductCardComponent product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AllProducts;
