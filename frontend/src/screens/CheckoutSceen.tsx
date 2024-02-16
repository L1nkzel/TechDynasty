import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  List,
  ListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";
import { updateCartItemQty, removeFromCart } from "../slices/shoppingCartSlice";
import LoginRegisterModal from "../components/LoginRegisterModal";
import { setIsRegistered, setOpen } from "../slices/loginRegisterSlice";
import { ProductType } from "../types";
import { Colors, theme } from "../assets/styles/styles";
import DeliveryInfo from "../components/DeliveryInfo";
import { useState } from "react";
import {
  ShoppingCart as ShoppingCartIcon,
  Person,
  Payment as PaymentIcon,
} from "@mui/icons-material";

const CheckoutSceen = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  //error states for delivery info form
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);
  const [isCityEmpty, setIsCityEmpty] = useState(false);
  const [isPostalCodeEmpty, setIsPostalCodeEmpty] = useState(false);
  const [isCountryEmpty, setIsCountryEmpty] = useState(false);

  const cart = useSelector((state: any) => state.shoppingCart);

  const { cartItems } = cart;
  const priceOfItems = cartItems
    .reduce((acc: any, item: any) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const { open, isRegistered } = useSelector(
    (state: any) => state.loginRegister
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [context, setContext] = useState("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (userInfo) {
        // Check if any address field is empty
        const areFieldsEmpty =
          address === "" || city === "" || postalCode === "" || country === "";

        // If any field is empty, prevent expanding to panel3
        if (panel === "panel3" && areFieldsEmpty) {
          setExpanded("panel2");
        } else {
          setExpanded(newExpanded ? panel : false);
        }
      }
    };

  const cartHandler = () => {
    if (userInfo) {
      //go to accoridon delivery info
      setExpanded("panel2");
    } else {
      setExpanded("panel1");
      dispatch(setOpen(true));
      dispatch(setIsRegistered(false));
      setContext("checkoutCartLogin");
    }
  };

  const updateCartHandler = async (item: ProductType, qty: number) => {
    dispatch(updateCartItemQty({ ...item, qty }));
  };

  const removeFromCartHandler = async (item: ProductType) => {
    dispatch(removeFromCart(item));
  };

  const deliveryInfoHandler = () => {
    // Check if any address field is empty
    setIsAddressEmpty(address === "");
    setIsCityEmpty(city === "");
    setIsPostalCodeEmpty(postalCode === "");
    setIsCountryEmpty(country === "");

    // If any field is empty, prevent expanding to panel3
    const areFieldsEmpty =
      address === "" || city === "" || postalCode === "" || country === "";

    setExpanded(areFieldsEmpty ? "panel2" : "panel3");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid
          container
          justifyContent="center"
          padding={2}
          bgcolor={"#f5f5f5"}
          sx={{ minHeight: "82vh" }}
        >
          <Grid item xxxs={12} xs={10} sm={11} md={9} lg={7}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{
                margin: "20px 0",
              }}
            >
              <AccordionSummary>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: Colors.header100,
                  }}
                >
                  <ShoppingCartIcon />
                  <Typography sx={{ fontSize: 20 }}>Shopping Cart</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <ShoppingCart
                  cartItems={cartItems}
                  updateCartHandler={updateCartHandler}
                  removeFromCartHandler={removeFromCartHandler}
                  checkoutHandler={cartHandler}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{
                margin: "20px 0",
              }}
            >
              <AccordionSummary>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: Colors.header100,
                  }}
                >
                  <Person />
                  <Typography sx={{ fontSize: 20 }}>
                    Delivery Information
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <DeliveryInfo
                  deliveryInfoHandler={deliveryInfoHandler}
                  isFieldEmpty={
                    isAddressEmpty ||
                    isCityEmpty ||
                    isPostalCodeEmpty ||
                    isCountryEmpty
                  }
                  address={address}
                  setAddress={setAddress}
                  city={city}
                  setCity={setCity}
                  postalCode={postalCode}
                  setPostalCode={setPostalCode}
                  country={country}
                  setCountry={setCountry}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{
                margin: "20px 0",
              }}
            >
              <AccordionSummary>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: Colors.header100,
                  }}
                >
                  <PaymentIcon />
                  <Typography sx={{ fontSize: 20 }}>Payment method</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Payment Method</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xxxs={12} xxs={10} xs={8} sm={10} md={8} lg={3} m={4}>
            <Box position={"sticky"} top={"100px"}>
              <Typography
                variant="h5"
                sx={{ marginBottom: 1.5, color: Colors.header100 }}
              >
                Order Overview
              </Typography>
              <List>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {cartItems.map((item: any) => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xxxs: 14, xxs: 14, sm: 14, md: 16 },
                          fontWeight: "bold",
                        }}
                      >
                        {item.qty} x {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xxs: 14, sm: 14, md: 16 },
                          fontWeight: "bold",
                        }}
                      >
                        ${(item.price * item.qty).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </ListItem>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    Subtotal (
                    {cartItems.reduce(
                      (acc: any, item: any) => acc + item.qty,
                      0
                    )}
                    ) items
                  </Typography>
                  <Typography fontWeight="bold">${priceOfItems}</Typography>
                </ListItem>
                <ListItem></ListItem>
              </List>
            </Box>
          </Grid>
          <LoginRegisterModal
            redirectUrl="/checkout"
            setOpen={setOpen}
            open={open}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
            setExpandedPanel={setExpanded}
            context={context}
          />
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutSceen;
