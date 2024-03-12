import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  Grow,
  Input,
  LinearProgress,
  Typography,
} from "@mui/material";
import AdminNavigation from "./AdminNavigation";
import { Colors, CustomTextField } from "../../assets/styles/styles";
import { useState } from "react";
import {
  useAddProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import defaultImage from "../../assets/no_image.jpg";
import Message from "../Message";

const AddProduct = () => {
  const [addProduct] = useAddProductMutation({});
  const [uploadProductImage, { isLoading: uploading }] =
    useUploadProductImageMutation({});
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [errorImage, setErrorImage] = useState(false);
  const [productData, setProductData] = useState({
    user: userInfo._id,
    name: "",
    description: "",
    price: "",
    countInStock: "",
    image: "",
    category: "",
    rating: 0,
    numReviews: 0,
    brand: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(productData);

    try {
      await addProduct(productData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFileHandler = async (e: any) => {
    const formData = new FormData();
    const file = e.target.files[0];

    if (file) {
      setErrorImage(false);
      // If a file is selected
      formData.append("image", file);
      try {
        (await uploadProductImage(formData).unwrap()) as string;
        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
          setProductData({ ...productData, image: reader.result as string });
        };
        reader.readAsDataURL(file);
      } catch (error: any) {
        // If there is an error
        if (error?.data?.message === "Images only!") {
          setErrorImage(true);
        }
        console.log(error?.data?.message); 
      }
    } else {
      // If no file is selected or the user cancels, set to prev image
      setProductData({
        ...productData,
        image: productData.image,
      });
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        px: 2,
        pt: 2,
        justifyContent: { xs: "center", md: "start" },
        height: "82vh",
        overflow: "auto",
      }}
    >
      <Grid
        item
        xs={11}
        sm={10}
        md={3.5}
        lg={3}
        sx={{ p: 2, bgcolor: "white" }}
      >
        <AdminNavigation />
      </Grid>

      <Grid
        item
        xs={11}
        sm={9}
        md={4}
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: { xs: "center", sm: "center", md: "start" },
        }}
      >
        <Box sx={{ mb: 4, width: "100%" }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
            Add new product
          </Typography>
          <Typography
            sx={{
              width: { md: 200, lg: 300 },
              fontSize: 14,
              fontWeight: 400,
              color: "gray",
              mb: 2,
            }}
          >
            Fill in the form below to add a product
          </Typography>

          <FormControl fullWidth>
            <CustomTextField
              size="small"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              label="Name"
              name="name"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>

          <FormControl fullWidth>
            <CustomTextField
              size="small"
              value={productData.description}
              multiline
              onChange={(e) =>
                setProductData({
                  ...productData,
                  description: e.target.value,
                })
              }
              label="Description"
              name="description"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>

          <FormControl fullWidth>
            <CustomTextField
              size="small"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              label="Price"
              name="price"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl fullWidth>
            <CustomTextField
              size="small"
              value={productData.countInStock}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  countInStock: e.target.value,
                })
              }
              label="Qty in Stock"
              name="countInStock"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl fullWidth>
            <CustomTextField
              size="small"
              value={productData.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
              label="Category"
              name="category"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>

          <FormControl fullWidth>
            <CustomTextField
              size="small"
              value={productData.brand}
              onChange={(e) =>
                setProductData({ ...productData, brand: e.target.value })
              }
              label="Brand"
              name="brand"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                minHeight: 220,
                maxheight: 240,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 10px 1px",
                borderRadius: "5px",
                border: "1px solid lightgray",
              }}
            >
              <Box
                component={"img"}
                src={productData.image ? productData.image : defaultImage}
                maxHeight={220}
                alt="image"
                sx={{
                  width: { xs: 230, sm: 300 },
                  height: { xs: 190, sm: "100%" },
                  borderRadius: "5px",
                  p: 1,
                }}
              />
            </Card>
            <>
              <Button
                size="large"
                variant="text"
                component="label"
                htmlFor="fileInput"
                disableRipple
                sx={{
                  width: "100%",
                  mt: 2,
                  mb: 1,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                Choose a image
              </Button>
              {errorImage && (
                <Grow in={errorImage}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 1,
                      ml: 4,
                    }}
                  >
                    <Message severity="error">
                      Only JPG, JPEG, PNG files are allowed
                    </Message>
                  </Box>
                </Grow>
              )}
              <Input
                id="fileInput"
                type="file"
                onChange={uploadFileHandler}
                sx={{ display: "none" }}
              />
            </>
          </Box>
          <Button
            size="large"
            onClick={handleSubmit}
            variant="contained"
            sx={{
              mt: 1,
              width: "100%",
              textTransform: "none",
              "&:hover": {
                backgroundColor: Colors.secondaryLight,
                color: "white",
              },
              backgroundColor: Colors.secondary,
              color: "white",
            }}
          >
            Add Product
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block", lg: "block" },
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: { xs: 300, sm: 300, md: 300, lg: 330 },
              minHeight: 220,
              maxheight: 240,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              ml: 4,
              mt: { md: 11.5, lg: 8.5 },

              boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 10px 1px",
              borderRadius: "5px",
              border: "1px solid lightgray",
            }}
          >
            <Box
              component={"img"}
              src={productData.image ? productData.image : defaultImage}
              height={220}
              maxHeight={220}
              alt="image"
              sx={{
                width: { xs: 290, sm: 290, md: 290, lg: 310 },
                borderRadius: "5px",
                p: 1,
              }}
            />
          </Card>
          <>
            <Button
              size="large"
              variant="contained"
              component="label"
              htmlFor="fileInput"
              sx={{
                width: { xs: 300, sm: 300, md: 300, lg: 330 },
                ml: 4,
                mt: 2,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: Colors.secondaryLight,
                  color: "white",
                },
                backgroundColor: Colors.secondary,
                color: "white",
              }}
            >
              Choose a image
            </Button>
            {errorImage && (
              <Grow in={errorImage}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 1,
                    ml: 4,
                  }}
                >
                  <Message severity="error">
                    Only JPG, JPEG, PNG files are allowed
                  </Message>
                </Box>
              </Grow>
            )}
            <Input
              id="fileInput"
              type="file"
              onChange={uploadFileHandler}
              sx={{ display: "none" }}
            />
          </>
          {uploading && <LinearProgress sx={{ mt: 2 }} />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddProduct;
