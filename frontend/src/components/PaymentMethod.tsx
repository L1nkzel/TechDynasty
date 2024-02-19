import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { savePaymentMethod } from "../slices/shoppingCartSlice";
import { useDispatch } from "react-redux";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const handlePaymentMethod = (e:any) => {
    e.preventDefault();
    setPaymentMethod(e.target.value);
    dispatch(savePaymentMethod(paymentMethod));
  }

  return (
    <>
      <FormControl sx={{ mx: 1 }}>
        <FormLabel id="demo-radio-buttons-group-label">
          Choose a payment method:
        </FormLabel>
        <RadioGroup sx={{ mt:1}} name="radio-buttons-group">
          <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
        </RadioGroup>
      </FormControl>
        <Box display={"flex"} justifyContent={"flex-end"} m={2}>
          <Button variant="contained" onClick={handlePaymentMethod}>Continue</Button>
        </Box>
    </>
  );
};

export default Payment;
