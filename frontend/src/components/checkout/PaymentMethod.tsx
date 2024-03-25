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
import { ProductType } from "../../types";
import { clearCart } from "../../slices/shoppingCartSlice";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { useDeleteOrderMutation } from "../../slices/ordersApiSlice";

const Payment = ({
  setPaymentMethod,
  paymentMethod,
  error,
  setError,
  createOrder,
  savePaymentMethod,
  cart,
  setExpanded,
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
  setExpanded: any;

  totalPrice: number;
  priceOfItems: number;
  shippingCost: number;
  taxAmount: number;
}) => {
  const dispatch = useDispatch();
  const { data: products, refetch } = useGetProductsQuery({}) as {
    isLoading: boolean;
    error: any;
    refetch: () => void;
    data: ProductType[];
  };
  const [deleteOrder] = useDeleteOrderMutation();

  const handleRadioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPaymentMethod = e.target.value;



    if (selectedPaymentMethod === "PayPal") {
        setPaymentMethod(selectedPaymentMethod);
        setError(""); 

        dispatch(savePaymentMethod(selectedPaymentMethod));

        const orderItemsWithDetails = cart.cartItems.map((item: ProductType & {qty: number}) => ({
          product: item._id,
            price: item.price, 
            image: item.image, 
            name: item.name,   
            brand: item.brand, 
            category: item.category, 
            description: item.description, 
            countInStock: item.countInStock, 
            rating: item.rating, 
            numReviews: item.numReviews, 
            qty: item.qty
        }));

        const res = await createOrder({
            orderItems: orderItemsWithDetails,
            shippingAddress: cart.shippingAddress,
            paymentOptions: selectedPaymentMethod,
            priceOfItems: priceOfItems,
            shippingCost: shippingCost,
            taxAmount: taxAmount,
            totalPrice: totalPrice,
        }).unwrap();
   
        dispatch(
            setOrder({
                id: res._id,
                orderItems: res.cartItems,
                totalPrice: res.totalPrice,
                paymentOptions: selectedPaymentMethod,
            })
        );

        const outOfStockItem = cart.cartItems.find((item: ProductType & {qty: number}) => {

          const product = products.find((p: ProductType) => p._id === item._id);
          if (product) {
            console.log(product, item);
        
            return product && item.qty > product.countInStock;
          }
     
        });
    
        if (outOfStockItem) {
            // Item is out of stock, cancel the order, empty the cart, and navigate to accordion 1
            deleteOrder(res._id);
            dispatch(setOrder(null));
            dispatch(clearCart());
            setExpanded("panel1"); // Navigate to accordion 1
            return;
        }

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
