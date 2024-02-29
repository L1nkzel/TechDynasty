import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Message from "../Message";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Colors, theme } from "../../assets/styles/styles";
import QuantitySelector from "../QuantitySelector";

const ShoppingCart = ({
  cartItems,
  updateCartHandler,
  removeFromCartHandler,
  checkoutHandler,
}: {
  cartItems: any;
  updateCartHandler: any;
  removeFromCartHandler: any;
  checkoutHandler: any;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        {cartItems.length === 0 ? (
          <Message severity="info">
            Your cart is empty
            <Link to="/" style={{ marginLeft: 4 }}>
              Go Back
            </Link>
          </Message>
        ) : (
          <Box sx={{ mx: 2 }}>
            <List>
              {cartItems.map((item: any) => (
                <ListItem key={item._id}>
                  <Grid
                    container
                    sx={{
                      alignItems: "center",
                      justifyContent: { xxxs: "center", xs: "space-between" },
                    }}
                  >
                    <Grid item xxxs={12} xs={5} sm={2.5} md={2} lg={2}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: {
                            xxxs: 100,
                            xs: 70,
                            sm: 100,
                            md: 100,
                            lg: 130,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xxxs={12} xs={7} sm={2} md={4} lg={3}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/product/${item._id}`}
                      >
                        <Typography
                          sx={{
                            fontSize: { xxxs: 14, xxs: 14, sm: 14, md: 16 },
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid item xxxs={12} xs={5} sm={3} md={3}>
                      <QuantitySelector
                        value={item.qty}
                        maxQty={item.countInStock}
                        onChange={(newValue: number) =>
                          updateCartHandler(item, newValue)
                        }
                      />
                    </Grid>
                    <Grid item xxxs={12} xs={7} sm={1} md={1} gap={1}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "start",
                          flexDirection: {
                            xxs: "column",
                            xs: "row",
                            sm: "column",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xxs: 14, sm: 14, md: 16 },
                            fontFamily: "Roboto",
                            fontWeight: 500,
                            mt: { xxs: 1, xs: 0 },
                            ml: { xxs: 0, xs: 0.5 },
                          }}
                        >
                          ${(item.price * item.qty).toFixed(2)}
                        </Typography>

                        <Button
                          sx={{ padding: 0, color: "grey" }}
                          onClick={() => {
                            removeFromCartHandler(item._id);
                          }}
                        >
                          <DeleteIcon
                            sx={{ fontSize: { xxxs: 13, sm: 13, md: 15 } }}
                          />
                          <Typography
                            sx={{
                              fontSize: { xxxs: 13, sm: 13, md: 15 },
                              textTransform: "none",
                            }}
                          >
                            Remove
                          </Typography>
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          m: 2,
          display: "flex",
          justifyContent: { xxxs: "center", xs: "flex-end" },
        }}
      >
        <Button
          sx={{
            textTransform: "none",
            fontFamily: "Montserrat",
            fontWeight: 500,
            "&:hover": { backgroundColor: Colors.secondary },
            backgroundColor: Colors.primaryLight,
          }}
          variant="contained"
          color="primary"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Go to Delivery info
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ShoppingCart;
