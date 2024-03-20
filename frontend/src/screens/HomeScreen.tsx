import { Box, Grid, Typography } from "@mui/material";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";
import { errorDisplayMessage } from "../components/errorDisplayMessage";
import { ProductType } from "../types";
const HomeScreen = () => {
  const { isLoading, error, data: products } = useGetProductsQuery({}) as 
  {
    isLoading: boolean;
    error: any;
    data: ProductType[];
  };

  return (
    <Box sx={{ mx: { xs: 3, sm: 5, md: 6, lg: 10, xl: 18 }, bgcolor: "white", p:1}}>
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
                <Grid item xs={8} sm={5} md={2.5} key={product._id}>
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HomeScreen;
