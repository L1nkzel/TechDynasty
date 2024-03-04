import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setOrder } from "../../slices/orderSlice";

const Payment = ({
  setPaymentMethod,
  paymentMethod,
  error,
  setError,
  createOrder,
  savePaymentMethod,
  cart,

  totalPrice,
  priceOfItems,
  shippingCost,
  taxAmount,
}: {
  setPaymentMethod: any;
  paymentMethod: String;
  error: String;
  setError: any;
  createOrder: any;
  savePaymentMethod: any;
  cart: any;

  totalPrice: number;
  priceOfItems: number;
  shippingCost: number;
  taxAmount: number;
}) => {
  const dispatch = useDispatch();

  const handleRadioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPaymentMethod = e.target.value;

    if (selectedPaymentMethod === "PayPal") {
      setPaymentMethod(selectedPaymentMethod); // Update selected payment method
      setError(""); // Clear any previous errors

      // Dispatch action to save payment method
      dispatch(savePaymentMethod(selectedPaymentMethod));

      // Create order with selected payment method
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentOptions: selectedPaymentMethod,
        priceOfItems: priceOfItems,
        shippingCost: shippingCost,
        taxAmount: taxAmount,
        totalPrice: totalPrice,
      }).unwrap();
      console.log("Response from createOrder:", res); // Log the entire response object
      console.log("Order ID from response:", res._id); // Log the order ID

      dispatch(
        setOrder({
          id: res._id,
          orderItems: res.cartItems,
          totalPrice: res.totalPrice,
          paymentOptions: selectedPaymentMethod,
        })
      );

      console.log(res._id);
      console.log(res.orderItems);
      console.log(res.totalPrice);
    } else {
      setPaymentMethod(selectedPaymentMethod);
      setError("");
    }
  };

  return (
    <>
      <FormControl sx={{ mx: 1 }}>
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{ fontFamily: "Montserrat", fontWeight: 500 }}
        >
          Choose a payment method:
        </FormLabel>
        <RadioGroup
          sx={{ mt: 1 }}
          name="radio-buttons-group"
          value={paymentMethod}
          onChange={handleRadioChange}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <FormControlLabel
                value={"PayPal"}
                control={<Radio />}
                label="PayPal"
                sx={{ fontFamily: "Roboto", fontWeight: 500 }}
              />
              {error && (
                <Typography variant="body2" color="error" sx={{ ml: 1 }}>
                  {error}
                </Typography>
              )}
            </Box>
            <Box
              component="img"
              src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png"
              alt="PayPal Logo"
              style={{ height: "15px", width: "50px" }}
            />
          </Box>
          <Divider />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Payment;
