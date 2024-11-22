import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&:hover .cart-icon': {
    opacity: 1,
  },
  height: '375px',
}));

const DiscountContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '8%',
  color: '#DC586D',
  border: '2px #DC586D solid',
  top: '15px',
  left: '15px',
  zIndex: 2,
  width: '70px',
  display: 'flex',
  justifyContent: 'center',
}));

function ProductCardComponent({ product, handleAddToCart }) {
  return (
    <Box sx={{ marginBottom: '25px', marginRight: '25px' }}>
      <Link
        to={`/product-update/${product.slug}`}
        style={{ textDecoration: 'none' }}
      >
        <ProductCard>
          {product.discount > 0 && (
            <DiscountContainer>
              <Typography variant="nav">{product.discount}% OFF</Typography>
            </DiscountContainer>
          )}

          <Box
            sx={{
              height: 300,
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={product.image[0]}
              alt={product.name}
              sx={{
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <Typography gutterBottom variant="body2">
                  {product.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Typography variant="body2" color="text.secondary">
                  $ {product.price.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </ProductCard>
      </Link>
    </Box>
  );
}

export default ProductCardComponent;
