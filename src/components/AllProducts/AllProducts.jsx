import { useEffect, useState } from 'react';
import { getFilteredProducts } from '../../services/productService';
import { Grid, Box, Typography, Button, Link, Pagination } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import ProductCardComponent from '../ProductCard';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filters = {
          page: currentPage,
          limit: 16,
          category: null,
        };

        const response = await getFilteredProducts(filters);
        setProducts(response.products);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log('Error fetching products', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      <Box my={3}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              Manage Product
            </Typography>
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
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>
    </Box>
  );
}

export default AllProducts;
