import { Box, Grid, Typography} from "@mui/material";
import Product, { ProductType } from "../components/Product";
import { useParams } from "react-router-dom";
import { errorDisplayMessage } from "../components/errorDisplayMessage";
import Message from "../components/Message";
import { useGetProductsByCategoryQuery } from "../slices/productsApiSlice";

const CategoryScreen = () => {
  const {category: category } = useParams();
  const { isLoading, error, data: products } = useGetProductsByCategoryQuery(category);

  return (
    <> {isLoading ? (
      <Typography>Loading...</Typography>
    ) : error ? (
      <Message severity="error">{errorDisplayMessage(error)}</Message>
    ) : (
    
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
              <Product product={product}/>
            </Grid>
          ))}
        </Grid>
      </Box>
         )}
    </>
  );
};

export default CategoryScreen;