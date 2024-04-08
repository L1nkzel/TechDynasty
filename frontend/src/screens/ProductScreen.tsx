import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  useGetProductByIdQuery,
  useIncrementViewMutation,
} from "../slices/productsApiSlice";
import Message from "../components/Message";
import { errorDisplayMessage } from "../components/errorDisplayMessage";
import { useEffect, useState } from "react";
import CustomSelect from "../components/CustomSelect";
import { addToCart } from "../slices/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../assets/styles/styles";
import AlertBox from "../components/AlertBox";
import { RootState } from "../store";
import { ProductType } from "../types";
import Reviews from "../components/Reviews";
import { setIsRegistered, setOpen } from "../slices/loginRegisterSlice";
import LoginRegisterModal from "../components/LoginRegisterModal";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    isLoading,
    error,
    refetch,
    data: product,
  } = useGetProductByIdQuery(productId) as {
    isLoading: boolean;
    error: any;
    refetch: () => void;
    data: ProductType;
  };
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const { open, isRegistered } = useSelector(
    (state: any) => state.loginRegister
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const [incrementViews] = useIncrementViewMutation();

  useEffect(() => {
    // Call the API endpoint to increment views when component mounts
    const increment = async () => {
      try {
        const res = await incrementViews(productId).unwrap();
        console.log("increment succesfull", res);
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    };

    increment();

    // Clean up function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, [productId]); // Execute effect when productId changes

  const addToCartHandler = () => {
    if (userInfo && !userInfo.isAdmin) {
      dispatch(
        addToCart({
          ...product,
          qty: qty,
        })
      );
      navigate("/checkout");
    } else if (!userInfo) {
      dispatch(
        addToCart({
          ...product,
          qty: qty,
        })
      );
      navigate("/checkout");
    } else {
      setOpenModal(true);
    }
  };

  const handleChange = (event: any) => {
    setQty(event.target.value);
  };

  const handleLoginFromReviews = () => {
    dispatch(setOpen(true));
    dispatch(setIsRegistered(false));
  }

  return (
    <Box sx={{ minHeight: "82vh", p: 2 }}>
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      ) : error ? (
        <Message severity="error">{errorDisplayMessage(error)}</Message>
      ) : (
        <>
          <Button href="/" variant="outlined" sx={{ ml: 4, mt: 1 }}>
            Back
          </Button>

          <Grid container justifyContent={"center"} sx={{ mt: 2 }}>
            <Grid item xs={9} sm={6} md={6} lg={5} xl={5}>
              {/* Image grid */}
              <Typography sx={{ fontWeight: "bold", fontSize: 26 }}>
                {product.name}
              </Typography>
              <Rating
                value={product.rating || 0}
                text={`${product.numReviews} reviews`}
                iconFontSize={24}
              />
              <CardMedia
                component="img"
                src={product.image}
                alt={product.name}
              />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {/* "Descripton" grid */}
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mt: 4, mb: 2 }}
                >
                  About this product
                </Typography>
                <Typography sx={{ mb: 5, whiteSpace: "pre-line" }}>
                  {product.description}
                </Typography>

                {/* Reviews grid */}
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Reviews
                </Typography>
                {product.reviews?.length === 0 ? (
                  <Typography sx={{ mb: 2 }}>
                    No reviews yet, be the first to review!
                  </Typography>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography sx={{ mb: 1, fontWeight: 500 }}>
                      {" "}
                      Average rating based on {product.numReviews} reviews
                    </Typography>
                    <Rating value={product.rating || 0} iconFontSize={24} />
                  </Box>
                )}
                <Reviews
                  product={product}
                  productId={productId as string}
                  refetch={refetch}
                  handleLogin={handleLoginFromReviews}
                />
                <LoginRegisterModal 
                  open={open}
                  setOpen={setOpen}
                  setIsRegistered={setIsRegistered}
                  isRegistered={isRegistered}
                  setExpandedPanel={() => {}}
                />

              </Box>
            </Grid>

            {/* Cart grid */}
            <Grid
              item
              xs={9}
              sm={4}
              md={4}
              lg={4}
              xl={4}
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
                {/* Add to cart */}
                {product.countInStock > 0 && (
                  <Box>
                    <CustomSelect value={qty} onChange={handleChange}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Box>
                )}
                <Button
                  disabled={product.countInStock === 0}
                  variant="contained"
                  onClick={addToCartHandler}
                  sx={{
                    textTransform: "none",
                    "&:hover": { backgroundColor: Colors.secondaryLight },
                    backgroundColor: Colors.secondary,
                  }}
                >
                  Add To Cart
                </Button>
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
            <AlertBox
              open={openModal}
              setOpen={setOpenModal}
              text={"Log in as a customer to access this"}
            />
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProductScreen;
