import { useEffect, useState } from "react";
import { Box, Grid} from "@mui/material";
import Product, { ProductType } from "../components/Product";
import axios from "axios";
import { useParams } from "react-router-dom";
const CategoryScreen = () => {

const [products, setProducts] = useState<ProductType[]>([]);

    const {category: category } = useParams();


  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/category/${category}`);
      setProducts(data);
    };
    fetchProducts();
  }, [category]);

  return (
    <>
    
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
            <Grid item xs={8} sm={5} md={3} key={product._id}>
              <Product product={product}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CategoryScreen;