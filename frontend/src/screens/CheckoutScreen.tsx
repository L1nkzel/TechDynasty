import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "../components/checkout/ShoppingCart";
import {
  updateCartItemQty,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} from "../slices/shoppingCartSlice";
import LoginRegisterModal from "../components/LoginRegisterModal";
import { setIsRegistered, setOpen } from "../slices/loginRegisterSlice";
import { ProductType } from "../types";
import { Colors, theme } from "../assets/styles/styles";
import DeliveryInfo from "../components/checkout/DeliveryInfo";
import { useEffect, useRef, useState } from "react";
import {
  ShoppingCart as ShoppingCartIcon,
  Person,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import PayPal from "../components/checkout/PayPal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  useCreateOrderMutation,
  useGetPaypalClientIdQuery,
} from "../slices/ordersApiSlice";
import { setOrder } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";


const CheckoutSceen = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const order = useSelector((state: RootState) => state.order); 
  const cart = useSelector((state: RootState) => state.shoppingCart);
  
  const [expanded, setExpanded] = useState("panel1");
  const [error, setError] = useState("");
  const { cartItems, shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const navigate = useNavigate();
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [paymentMethod, setPaymentMethod] = useState("");
  //error states for delivery info form
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);
  const [isCityEmpty, setIsCityEmpty] = useState(false);
  const [isPostalCodeEmpty, setIsPostalCodeEmpty] = useState(false);
  const [isCountryEmpty, setIsCountryEmpty] = useState(false);
  const priceExlTax = cartItems
    .reduce((acc: any, item: any) => acc + (item.qty * item.price) / 1.25, 0)
    .toFixed(2);
  const shippingCost = (priceExlTax > 300 ? 0 : 10).toFixed(2);
  const taxAmount = (priceExlTax * 0.25).toFixed(2);
  const totalPrice = (
    Number(priceExlTax) +
    Number(shippingCost) +
    Number(taxAmount)
  ).toFixed(2);

  const { open, isRegistered } = useSelector(
    (state: any) => state.loginRegister
    );
    
    const [createOrder] = useCreateOrderMutation();
    const { data: paypal } = useGetPaypalClientIdQuery("");
    
    const dispatch = useDispatch();
    const [context, setContext] = useState("");
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const paymentMethodAccordionRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
      if (expanded === "panel3") {
        // Introduce a slight delay to allow for the expansion animation to complete
        const delay = setTimeout(() => {
          scrollPaymentMethodAccordionIntoView();
        }, 100); // Adjust this delay as needed
        
        return () => clearTimeout(delay);
      }
    }, [expanded]);

    //Temporary fix to Redirect to home page if user is logged in as admin
    useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const scrollPaymentMethodAccordionIntoView = () => {
    if (paymentMethodAccordionRef?.current) {
      paymentMethodAccordionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle panel expansion
  const handleChange = async (panel: string, newExpanded: boolean) => {
    if (userInfo && cartItems.length > 0) {
      setExpanded(newExpanded ? panel : "");
    }
    if (panel === "panel1") {
      // Reset order states
      setPaymentMethod("");
      dispatch(setOrder(""));
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
      setContext("checkoutCartLogin"); //for login register modal in checkout page
    }
  };
  const updateCartHandler = async (item: ProductType, newQty: number) => {
    dispatch(updateCartItemQty({ ...item, qty: newQty }));
  };

  const removeFromCartHandler = async (item: ProductType) => {
    dispatch(removeFromCart(item));
  };

  const deliveryInfoHandler = (e: any) => {
    e.preventDefault();

    const areFieldsEmpty =
      address === "" || city === "" || postalCode === "" || country === "";

    if (areFieldsEmpty) {
      setIsAddressEmpty(address === "");
      setIsCityEmpty(city === "");
      setIsPostalCodeEmpty(postalCode === "");
      setIsCountryEmpty(country === "");
      setExpanded("panel2");
    } else {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      setExpanded("panel3");
    }
  };

  const handlePaymentMethod = async (e: any) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    dispatch(savePaymentMethod(paymentMethod));
    await createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentOptions: paymentMethod,
      priceOfItems: priceExlTax,
      shippingCost: shippingCost,
      taxAmount: taxAmount,
      totalPrice: totalPrice,
    }).unwrap();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        padding={2}
        bgcolor={"#f5f5f5"}
        sx={{ minHeight: "82vh", }}
      >
        <Grid item xxxs={12} xs={10} sm={11} md={9} lg={6} xl={6} sx={{ mx: { xs: 3, sm: 5, md: 6, lg: 10 }}}>
          <Accordion
            expanded={expanded === "panel1"}
            ref={paymentMethodAccordionRef}
            onChange={() => handleChange("panel1", true)}
            sx={{
              margin: "20px 0",
              border: 0,
              boxShadow: 0,
            }}
          >
            <AccordionSummary>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: Colors.title,
                  }}
                >
                  <ShoppingCartIcon />
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: 20,
                    }}
                  >
                    Shopping Cart
                  </Typography>
                </Box>
                <Button
                  onClick={() => handleChange("panel1", true)}
                  style={{
                    display:
                      expanded === "panel2" || expanded === "panel3"
                        ? "block"
                        : "none",
                  }}
                >
                  Change
                </Button>
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
            disabled={expanded === "panel1"}
            onChange={() => handleChange("panel2", true)}
            ref={paymentMethodAccordionRef}
            sx={{
              margin: "20px 0",
              boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.2)", // Add a box shadow to the bottom
              "&.MuiAccordion-root:before": {
                backgroundColor: "white",
              },
            }}
          >
            <AccordionSummary>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: Colors.title,
                  }}
                >
                  <Person />
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: 20,
                    }}
                  >
                    Delivery Information
                  </Typography>
                </Box>

                <Button
                  onClick={() => handleChange("panel2", true)}
                  style={{
                    display: expanded === "panel3" ? "block" : "none",
                    cursor: "default",
                  }}
                >
                  Change
                </Button>
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
            disabled={expanded !== "panel3"}
            ref={paymentMethodAccordionRef}
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
                  color: Colors.title,
                }}
              >
                <PaymentIcon />
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  Payment method
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minHeight: 450,
              }}
            >
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                savePaymentMethod={savePaymentMethod}
                error={error}
                setError={setError}
                createOrder={createOrder}
                cart={cart}
                priceOfItems={Number(priceExlTax)}
                shippingCost={Number(shippingCost)}
                taxAmount={Number(taxAmount)}
                totalPrice={Number(totalPrice)}
              />

              <Box sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
                <OrderSummary
                  cartItems={cartItems}
                  paymentMethod={paymentMethod}
                  shippingCost={Number(shippingCost)}
                  taxAmount={Number(taxAmount)}
                  totalPrice={Number(totalPrice)}
                />
              </Box>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Box sx={{ m: 2, width: 200 }}>
                  <Button
                    variant="contained"
                    disabled
                    sx={{
                      zIndex: 2,
                      pointerEvents: "none",
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      width: "100%",
                      "&:hover": { backgroundColor: Colors.secondaryLight },
                      backgroundColor: Colors.secondary,
                    }}
                  >
                    Complete Order
                  </Button>
                </Box>
                {order && paymentMethod === "PayPal" ? (
                  <PayPalScriptProvider
                    options={{ clientId: paypal?.clientId }}
                    deferLoading={!paypal?.clientId}
                  >
                    <PayPal setPaymentMethod={setPaymentMethod} />
                  </PayPalScriptProvider>
                ) : (
                  order &&
                  paymentMethod && (
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-end"}
                      m={2}
                    >
                      <Button
                        variant="contained"
                        onClick={handlePaymentMethod}
                        sx={{
                          textTransform: "none",
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          "&:hover": { backgroundColor: Colors.secondaryLight },
                          backgroundColor: Colors.secondary,
                        }}
                      >
                        Complete Order
                      </Button>
                    </Box>
                  )
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Order Summary */}
        {isLargeScreen && (
          <Grid item xxxs={12} xxs={10} xs={8} sm={10} md={8} lg={3.5} m={4}>
            <Box position={"sticky" } top={"120px"}>
              <OrderSummary
                cartItems={cartItems}
                shippingCost={Number(shippingCost)}
                taxAmount={Number(taxAmount)}
                totalPrice={Number(totalPrice)}
                paymentMethod={paymentMethod}
              />
            </Box>
          </Grid>
        )}
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
    </ThemeProvider>
  );
};

export default CheckoutSceen;
