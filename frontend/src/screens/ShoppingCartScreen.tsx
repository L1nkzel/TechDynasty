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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

import { updateCartItemQty, removeFromCart } from "../slices/shoppingCartSlice";
import Message from "../components/Message";
import { ProductType } from "../types";
import LoginRegisterModal from "../components/LoginRegisterModal";
import { setIsRegistered, setOpen } from "../slices/loginRegisterSlice";


const ShoppingCartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { open, isRegistered } = useSelector((state: any) => state.loginRegister);


  const theme = createTheme({
    breakpoints: {
      values: {
        xxxs: 0,
        xxs: 350,
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

    const updateCartHandler = async (item: ProductType, qty: number) => {
        dispatch(updateCartItemQty({ ...item, qty }))
    }

    const removeFromCartHandler = async (item: ProductType) => {
        dispatch(removeFromCart(item))

    }
    const checkoutHandler = () => {
      if (userInfo) {
        navigate('/shipping')
      } else {
        dispatch(setOpen(true))
        dispatch(setIsRegistered(false))
      }
    }

    return (
        <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" padding={2} bgcolor={"#f5f5f5"} sx={{ minHeight: "82vh" }}>
          <Grid item xs={9} sm={11} md={9} lg={8} >
            {cartItems.length === 0 ? (
                <Message severity="info">
                Your cart is empty<Link to='/' style={{marginLeft: 4}}>Go Back</Link>
              </Message>
            ) : (
                <Card sx={{ margin: 2, padding: 2 }}>
                  <Typography variant='h5' sx={{ mb: 2, ml: 2 }}>Shopping Cart</Typography>
              <List>
                {cartItems.map((item: any) => (
                  <ListItem key={item._id}>
                    <Grid container alignItems="center" justifyContent={"space-between"}>
                      <Grid item xxxs={8} xxs={3} xs={5} sm={2.5} md={2} lg={2}>
                        <Box component="img" src={item.image} alt={item.name} sx={{width: { xxxs: 50, xxs: 50 ,xs: 70, sm: 100, md: 100, lg: 130  }}} />
                      </Grid>
                      <Grid item xxxs={6} xxs={5} xs={7} sm={2} md={4} lg={3} >
                        <Link style={{textDecoration: "none"}} to={`/product/${item._id}`}>
                          <Typography sx={{fontSize: {xxxs: 14, xxs: 14, sm: 14, md: 16}}}>{item.name}</Typography>
                          </Link>
                      </Grid>
                      <Grid item xxxs={4} xxs={3} xs={1} sm={2} md={2}>
                        <FormControl>
                          <Select
                            value={item.qty}
                            size="small"
                            sx={{ width: {xxxs: 70, xxs: 70, xs: 70, sm: 70, md: 80, lg: 100} }}
                            onChange={(e) => updateCartHandler(item, Number(e.target.value))}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xxxs={4} xxs={5} xs={1} sm={1} md={1}  sx={{ marginLeft: {xs: 0, sm: 0}  }}>
                        <Typography sx={{fontSize: {xxs: 14, sm: 14, md: 16}}}>${(item.price * item.qty).toFixed(2)}</Typography></Grid>
                      <Grid item xxxs={3} xxs={2} xs={2} sm={1} md={1} lg={2} >
                        <IconButton onClick={() => {removeFromCartHandler(item._id)}}>
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
          <Grid item xxxs={12} xxs={12} xs={8} sm={8} md={4} lg={3} my={8}>
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
                    onClick={checkoutHandler}
                  >
                    <Typography></Typography>
                    Proceed To Checkout
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
        <LoginRegisterModal redirectUrl="/shopping-cart" setOpen={setOpen} open={open} isRegistered={isRegistered} setIsRegistered={setIsRegistered} />
        </ThemeProvider>
      );
};

export default ShoppingCartScreen;
