import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";

const ProductScreen = () => {
  /* This code fetches the URL's "id" parameter using 
    React Router's useParams hook and then looks 
    for a matching product in the products array based on the "_id" property. */
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);

  //Error handling if no product is found
  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  return (
    <>
      <Button href="/" variant="outlined" sx={{ ml: 4, mt: 1 }}>
        Back
      </Button>

      <Grid container sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Grid item xs={8} sm={6} md={6} lg={5} xl={4}>
          <Typography sx={{ fontWeight: "bold", fontSize: 26 }}>
            {product.name}
          </Typography>

          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            iconFontSize={24}
          />

          <CardMedia component="img" src={product.image} alt={product.name} />
        </Grid>

        <Grid item xs={6} sm={4} md={3} lg={3} xl={3} sx={{ ml: {sm: 8, md: 8 } }}>
          <Card sx={{ p: 2, my: 2 }}>
            <Box display="flex">
              <Typography sx={{ mr: 0.5 }}>Price:</Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
              >{`$${product.price}`}</Typography>
            </Box>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Box display="flex">
              <Typography sx={{ mr: 0.5 }}>Status:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </Typography>
            </Box>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Button variant="contained">
                Add To Cart
              </Button>
       
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductScreen;
