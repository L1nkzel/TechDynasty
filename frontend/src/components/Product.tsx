import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ProductType {
  image: string;
  name: string;
  price: number;
  _id: string;
}

const Product: FunctionComponent<{ product: ProductType }> = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <CardMedia component="img" image={product.image} />
      </Link>
      <CardContent>
        <Link to={`/product/${product._id}`}>
          <Typography fontSize={18} component="div">
            {product.name}
          </Typography>
        </Link>
        <Typography variant="subtitle1" color="text.secondary">
          $ {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
