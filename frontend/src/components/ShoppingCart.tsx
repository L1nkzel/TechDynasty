import { Box, Button, FormControl, Grid, List, ListItem, MenuItem, Select, ThemeProvider, Typography } from '@mui/material';
import Message from './Message';
import { Link } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import { theme } from '../assets/styles/styles';

const ShoppingCart = ({ cartItems, updateCartHandler, removeFromCartHandler, checkoutHandler  }: { cartItems: any, updateCartHandler: any, removeFromCartHandler: any, checkoutHandler: any }) => {
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
            <Box sx={{ margin: 2, padding: 2 }}>
         
              <List>
                {cartItems.map((item: any) => (
                  <ListItem key={item._id}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent={"space-between"}
                    >
                      <Grid item xxxs={6} xs={5} sm={2.5} md={2} lg={2}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: {
                              xxxs: 50,
                              xxs: 50,
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
                      <Grid item xxxs={12} xs={2} sm={2} md={2}>
                        <FormControl>
                          <Select
                            value={item.qty}
                            size="small"
                            sx={{
                              width: {
                                xxxs: 70,
                                xxs: 70,
                                xs: 70,
                                sm: 70,
                                md: 80,
                                lg: 100,
                              },
                            }}
                            onChange={(e) =>
                              updateCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xxxs={1}
                        xs={1}
                        sm={1}
                        md={1}
                        sx={{ marginLeft: { xs: 0, sm: 0 } }}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={1}
                      >
                        <Typography
                          sx={{ fontSize: { xxs: 14, sm: 14, md: 16 }, fontWeight: "bold" }}
                        >
                          ${(item.price * item.qty).toFixed(2)}
                        </Typography>
                     
                        <Button
                          sx={{ padding: 0, color:"grey"}}
                          onClick={() => {
                            removeFromCartHandler(item._id);
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: { xxxs: 20, sm: 14, md: 16 } }}/>
                          <Typography sx={{ fontSize: { xxxs: 14, sm: 14, md: 16 }, textTransform: "none" }}>Remove</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
            <Box sx={{m: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                sx={{textTransform: "none", width: {}}}
                  variant="contained"
                  color="primary"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Go to Delivery info
                </Button>
                </Box>

      </ThemeProvider>
  )
}

export default ShoppingCart;