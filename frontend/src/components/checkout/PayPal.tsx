import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import {
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useDeleteOrderMutation,
} from "../../slices/ordersApiSlice";
import { Box, Button } from "@mui/material";
import { FUNDING } from "@paypal/react-paypal-js";
import { Colors } from "../../assets/styles/styles";
import { clearCart, savePaymentMethod } from "../../slices/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOrder } from "../../slices/orderSlice";

const PayPalModal = ({ setPaymentMethod }: { setPaymentMethod: any }) => {
  const order = useSelector((state: any) => state.order);
  const { data: paypal } = useGetPaypalClientIdQuery({});
  const [payOrder, { isLoading: loadingPayPal, error: errorPayPal }] =
    usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [deleteOrder, { error }] = useDeleteOrderMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!errorPayPal && loadingPayPal && paypal?.clientId && order) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" as any });
      };
      if (order) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, paypal, paypalDispatch, order]);

  // Handle payment creation
  const createOrder = (data: any, actions: any) => {
    console.log("Total Price:", order.totalPrice);

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice || "0",
            },
          },
        ],
      })
      .then((orderID: any) => {
        console.log("Order ID:", orderID);
        return orderID;
      });
  };

  // Handle payment approval
  const onApprove = (data: any, actions: any) => {
    console.log("Transaction approved:", data);
    return actions.order.capture().then(async function (details: any) {
      console.log("PayPal response details:", details); // Log the details object
      try {
        const reqBody = {
          orderId: order.id,
          details: { ...details, email_address: details.payer.email_address }
        }
        await payOrder(reqBody);
        dispatch(clearCart());
        dispatch(savePaymentMethod(""));

        console.log("Transaction completed by", details.payer.name.given_name);
        navigate(`/order/${order.id}`);
      } catch (err) {
        console.log(err);
        onCancel();
      }
    });
  };

  // Handle payment cancellation
  const onCancel = async () => {
   // Handle cancellation
    try {
      const res = await deleteOrder(order.id);
      console.log("Order deleted successfully", res);
    } catch {
      console.error("Error deleting order:", error);
      // Handle error
    }
    await setPaymentMethod("");
    dispatch(setOrder(null));
  };

  return (
    <>
      {isPending}

      <Box sx={{ width: 200, position: "absolute", m: 2 }}>
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
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
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <PayPalButtons
            fundingSource={FUNDING.PAYPAL}
            disabled={isPending}
            style={{
              color: "blue",
              height: 35,
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onCancel={onCancel}
          />
        </Box>
      </Box>
    </>
  );
};

export default PayPalModal;
