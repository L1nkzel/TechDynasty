import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import axios from "axios";
import { ProductType } from "../components/Product";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ProductScreen = () => {
  const [product, setProduct] = useState<ProductType>();

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

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

      <Grid container justifyContent={"center"} sx={{ mt: 2 }}>
        <Grid item xs={9} sm={6} md={6} lg={5} xl={4}>
          {/* Image grid */}
          <Typography sx={{ fontWeight: "bold", fontSize: 26 }}>
            {product.name}
          </Typography>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            iconFontSize={24}
          />
          <CardMedia component="img" src={product.image} alt={product.name} />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* "Descripton" grid */}
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
              About this product
            </Typography>
            <Typography sx={{ mb: 4 }}>{product.description}</Typography>
          </Box>
        </Grid>
        {/* Cart grid */}
        <Grid
          item
          xs={9}
          sm={4}
          md={4}
          lg={4}
          xl={3}
          sx={{ ml: { sm: 8, md: 8 } }}
        >
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
            <Button variant="contained">Add To Cart</Button>
          </Card>

          <Stack
            spacing={1}
            sx={{ my: 2, p: 2, background: "#f5f5f5", borderRadius: 2 }}
          >
            <Typography display="flex">
              <PublishedWithChangesIcon sx={{ mr: 1 }} />
              30 days open purchase
            </Typography>
            <Typography display="flex">
              <LocalShippingIcon sx={{ mr: 1 }} />
              Free shipping from 30$
            </Typography>
            <Typography display="flex">
              <AccessTimeIcon sx={{ mr: 1 }} />
              Same-day delivery
            </Typography>
          </Stack>
          
        </Grid>
        {/* "Descripton" grid small screen */}
        <Grid item xs={9} sx={{ display: { xs: "block", sm: "none" } }}>
          <Typography variant="h5" fontWeight="bold" sx={{ my: 2 }}>
            About this product
          </Typography>
          <Typography sx={{ mb: 4 }}>{product.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductScreen;
