import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ProductType } from "../../types";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Message from "../Message";
import { errorDisplayMessage } from "../errorDisplayMessage";
import CircularProgress from "@mui/material/CircularProgress";

const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useGetProductsQuery({}) as {
    isLoading: boolean;
    error: any;
    data: ProductType[];
  };

  const navigate = useNavigate();

  const editHandler = (id: string) => {
    navigate(`/editProduct/${id}`);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} mb={4}>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Message severity="error">{errorDisplayMessage(error)}</Message>
      ) : (
        <Grid
          container
          maxWidth={"lg"}
          margin={"auto"}
          justifyContent={"center"}
          rowSpacing={3}
          columnGap={2}
        >
          {products?.map((product: ProductType) => (
            <Grid item xs={8} sm={4} md={3.5} lg={2.5} xl={2} key={product._id}>
              <Card sx={{ minWidth: 180 }}>
                <Link to={`/${product.category}/${product._id}`}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    sx={{ width: 150, p: 1 }}
                  />
                </Link>

                <CardContent>
                  <Link to={`/${product.category}/${product._id}`}>
                    <Typography
                      fontSize={16}
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      component="div"
                    >
                      {product.name}
                    </Typography>
                  </Link>

                  <Typography fontSize={16} color="secondary">
                    {`$${product.price}`}
                  </Typography>
                  <Box display={"flex"} justifyContent={"end"}>
                    <IconButton
                      onClick={() => product._id && editHandler(product._id)}
                    >
                      {" "}
                      <EditIcon
                        sx={{ fontSize: { xxs: 14, xs: 16, sm: 18 } }}
                      />
                    </IconButton>
                    <IconButton onClick={() => {}} sx={{ ml: 1 }}>
                      <DeleteOutlineIcon
                        sx={{
                          fontSize: {
                            xxs: 14,
                            xs: 16,
                            sm: 18,
                            color: "crimson",
                          },
                        }}
                      />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Products;
