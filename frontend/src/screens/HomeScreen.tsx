import { Box, Grid, Typography } from "@mui/material";
import Product, { ProductType } from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";
import { errorDisplayMessage } from "../components/errorDisplayMessage";
const HomeScreen = () => {
  const { isLoading, error, data: products } = useGetProductsQuery({});

  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Message severity="error">{errorDisplayMessage(error)}</Message>
      ) : (
        <>
          <Typography fontSize={24} margin={2} ml={12} color={"darkkhaki"}>
            Latest Products{" "}
          </Typography>
          <Box display={"flex"} justifyContent={"center"} mb={4}>
            <Grid
              container
              maxWidth={"lg"}
              margin={"auto"}
              justifyContent={"center"}
              rowSpacing={3}
              columnGap={2}
            >
              {products.map((product: ProductType) => (
                <Grid item xs={8} sm={5} md={3} key={product._id}>
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default HomeScreen;
