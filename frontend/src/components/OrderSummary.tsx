import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { Colors } from "../assets/styles/styles";
import { ProductType } from "../types";

type OrderSummaryProps = {
  cartItems: ProductType[];
  shippingCost?: number;
  taxAmount?: number;
  totalPrice?: number;
  paymentMethod?: string;
};

const OrderSummary = ({
  cartItems,
  shippingCost,
  taxAmount,
  totalPrice,
  paymentMethod,
}: OrderSummaryProps) => {
  return (
    <>
      {cartItems.length > 0 && (
        <Box>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontSize: 18,
              fontWeight: 600,
              color: Colors.primary,
            }}
          >
            Order Summary
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
              {cartItems.map((item: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: { xxxs: 14, xxs: 14, sm: 14, md: 16 },
                      fontWeight: 500,
                      color: Colors.title,
                      marginRight: 1,
                    }}
                  >
                    {item.qty} x {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: { xxs: 14, sm: 14, md: 16 },
                      fontWeight: 600,
                    }}
                  >
                    ${(item.price * item.qty).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </ListItem>
            <Divider />

            <ListItem>
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
                    fontFamily: "Roboto",
                    fontSize: { xxs: 14, sm: 14, md: 16 },
                    fontWeight: 400,
                  }}
                >
                  Shipping:
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  ${shippingCost}
                </Typography>
              </Box>
            </ListItem>
            {paymentMethod && (
              <ListItem>
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
                      fontFamily: "Roboto",
                      fontSize: { xxs: 14, sm: 14, md: 16 },
                      fontWeight: 400,
                    }}
                  >
                    Payment Method:
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {paymentMethod}
                  </Typography>
                </Box>
              </ListItem>
            )}
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontFamily: "Roboto", fontWeight: 400, fontSize: 20 }}
              >
                Total (
                {cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)})
                items
              </Typography>
              <Box display={"flex"} alignItems={"end"} flexDirection={"column"}>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontWeight: 600,
                    fontSize: { xxs: 14, sm: 14, md: 16 },
                  }}
                >
                  ${totalPrice}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontWeight: 300,
                    fontSize: { xxs: 12, sm: 12, md: 14 },
                  }}
                >
                  Vat(25%): ${taxAmount}
                </Typography>
              </Box>
            </ListItem>
          </List>
        </Box>
      )}
    </>
  );
};

export default OrderSummary;
