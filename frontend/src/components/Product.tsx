import { Box, CardContent, CardMedia, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { ProductType } from "../types";
import { theme } from "../assets/styles/styles";


const Product: FunctionComponent<{ product: ProductType }> = ({ product }) => {

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  let productName = product.name;

  if (isSmallScreen && product.name.length > 17) {
    const lastSpaceIndex = product.name.lastIndexOf(" ", 17);
    productName = lastSpaceIndex !== -1 ? product.name.substring(0, lastSpaceIndex) + "" : product.name.substring(0, 17) + "...";
  }


  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ mx:0.5 }}>
      <Link to={`/${product.category}/${product._id}`}>
        <CardMedia component="img" image={product.image} />
      </Link>
    
      <CardContent>
      <Link style={{textDecoration: "none", color: "black"}} to={`/${product.category}/${product._id}`}>

          <Typography title={product.name} sx={{ minHeight: {xxs: 40, xs: 40, sm: 50}, fontSize: { xxs: 12, xs:14, sm: 16, md: 15, lg: 17 }} } component="div" >
          {productName}
          </Typography>
          </Link>
        <Box>
            <Rating style={{fontSize: {xxs: 11, xs: 13, md: 14, lg: 16}}} value={product.rating} reviewText={{fontSize: {xxs : 10, xs: 10, md: 14}}} text={`(${product.numReviews})`}/>
        </Box>
        <Typography  sx={{ fontSize: { xxs: 13, xs: 14, sm: 17, lg: 18 }} } color="secondary">
          {`$${product.price}`}
        </Typography>
      </CardContent>
    </Box>
    </ThemeProvider>
  );
};

export default Product;
