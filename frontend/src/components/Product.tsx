import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

interface ProductType {
  image: string;
  name: string;
  price: number;
}

const Product: FunctionComponent<{ product: ProductType }> = ({ product }) => {
  return (
    <Card>
      <CardMedia 
        component="img"
        image={product.image}
      />
      <CardContent>
        <Typography fontSize={18} component="div">
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          $ {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
