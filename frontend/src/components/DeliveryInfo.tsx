import { Box, Button, FormControl} from "@mui/material";
import {
  CustomTextField,
  DeliveryInfoContainer,
} from "../assets/styles/styles";

const DeliveryInfo = ({
  deliveryInfoHandler,
  isFieldEmpty,
  address,
  setAddress,
  city,
  setCity,
  postalCode,
  setPostalCode,
  country,
  setCountry,
}: {
  deliveryInfoHandler: (e: any) => void,
  isFieldEmpty: boolean;
  address: string;
  setAddress: any;
  city: string;
  setCity: any;
  postalCode: string;
  setPostalCode: any;
  country: string;
  setCountry: any;
}) => {


  return (
    <Box>
      <DeliveryInfoContainer>
        <FormControl fullWidth>
          <CustomTextField
            name="address"
            autoFocus
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={isFieldEmpty && !address}
            helperText={isFieldEmpty && !address && "* Address is required"}
            required
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <CustomTextField
            name="city"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={isFieldEmpty && !city}
            helperText={isFieldEmpty && !city  && "* City is required"}
            required
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <CustomTextField
            name="postalCode"
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            error={isFieldEmpty && !postalCode}
            helperText={isFieldEmpty && !postalCode && "* Postal Code is required"}
            required
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <CustomTextField
            name="country"
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            error={isFieldEmpty && !country}
            helperText={isFieldEmpty && !country && "* Country is required"}
            required
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
      </DeliveryInfoContainer>
      <Box sx={{ m: 2 }} display="flex" justifyContent="flex-end">
        <Button
          sx={{ textTransform: "none" }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={deliveryInfoHandler}
        >
          Go to Payment method
        </Button>
      </Box>
    </Box>
  );
};

export default DeliveryInfo;
