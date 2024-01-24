import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import Message from "../components/Message";

const ShoppingCartScreen = () => {

  const theme = createTheme({
    breakpoints: {
      values: {
        xxs: 0,
        xs: 450,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const cart = useSelector((state: any) => state.shoppingCart);
  const { cartItems } = cart;
  const priceOfItems = cartItems
    .reduce((acc: any, item: any) => acc + item.qty * item.price, 0)
    .toFixed(2);


    return (
        <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" padding={2} bgcolor={"#f5f5f5"} sx={{ minHeight: "82vh" }}>
          <Grid item xs={9} sm={11} md={9} lg={8} >
            {cartItems.length === 0 ? (
                <Message severity="info">
                Your cart is empty <Link to='/'>Go Back</Link>
              </Message>
            ) : (
                <Card sx={{ margin: 2, padding: 2 }}>
                  <Typography variant='h5' sx={{ mb: 2, ml: 2 }}>Shopping Cart</Typography>
              <List>
                {cartItems.map((item: any) => (
                  <ListItem key={item._id}>
                    <Grid container alignItems="center" justifyContent={"space-between"}>
                      <Grid item xxs={3} xs={4} sm={2} md={2} lg={2}>
                        <Box component="img" src={item.image} alt={item.name} sx={{width: { xxs: 50,xs: 70, sm: 100, md: 100, lg: 130  }}} />
                      </Grid>
                      <Grid item xxs={8} xs={8} sm={3} md={4} lg={3} >
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Grid>
                      <Grid item xxs={2} xs={1} sm={1} md={2}>
                        <FormControl>
                          <Select
                            value={item.qty}
                            size="small"
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xxs={3} xs={1} sm={1} md={1}  sx={{ marginLeft: {xs: 0, sm: 0}  }}>${(item.price * item.qty).toFixed(2)}</Grid>
                      <Grid item xxs={1} xs={2} sm={1} md={1} lg={2} >
                        <IconButton>
                         <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
              </Card>
            )}
          </Grid>
          <Grid item xxs={12} xs={8} sm={8} md={4} lg={3} my={8}>
            <Box >
              <List>
                <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                  <Typography variant='h6'>
                    Subtotal ({cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)}) items
                  </Typography>
                  <Typography fontWeight="bold">
                    ${priceOfItems}
                    </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={cartItems.length === 0}
                  >
                    Proceed To Checkout
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
        </ThemeProvider>
      );
};

export default ShoppingCartScreen;
