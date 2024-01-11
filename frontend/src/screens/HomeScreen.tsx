import { Box, Grid, Typography } from "@mui/material";
import products from "../products";
import Product from "../components/Product";
const HomeScreen = () => {
  return (
    <>
      <Typography fontSize={22} margin={2} ml={8} color={"darkkhaki"}>
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
          {products.map((product) => (
            <Grid item key={product._id} xs={8} sm={5} md={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HomeScreen;
