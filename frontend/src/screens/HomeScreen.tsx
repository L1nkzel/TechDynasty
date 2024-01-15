import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Product, { ProductType } from "../components/Product";
import axios from "axios";
const HomeScreen = () => {

const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
            <Grid item xs={8} sm={5} md={3}>
              <Product product={product} key={product._id}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HomeScreen;
