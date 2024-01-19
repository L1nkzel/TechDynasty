import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export interface ProductType {
  image: string;
  name: string;
  price: number;
  _id: string;
  rating: number;
  numReviews: number;
  category: string;
  countInStock: number;
  description: string;
}

const Product: FunctionComponent<{ product: ProductType }> = ({ product }) => {
  return (
    <Card>
      <Link to={`/${product.category}/${product._id}`}>
        <CardMedia component="img" image={product.image} />
      </Link>
    
      <CardContent>
      <Link to={`/${product.category}/${product._id}`}>
          <Typography fontSize={18} textOverflow="ellipsis" whiteSpace="nowrap" component="div" >
            {product.name}
          </Typography>
          </Link>
        <Box>
            <Rating iconFontSize={20} value={product.rating} text={`${product.numReviews} reviews`}/>
        </Box>
        <Typography fontSize={20} color="secondary">
          {`$${product.price}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
