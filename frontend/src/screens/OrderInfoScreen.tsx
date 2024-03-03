import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
} from "../slices/ordersApiSlice";
import Message from "../components/Message";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Colors, theme } from "../assets/styles/styles";
import { errorDisplayMessage } from "../components/errorDisplayMessage";
import OrderSummary from "../components/OrderSummary";

const OrderInfoScreen = () => {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Message severity="error">{errorDisplayMessage(error)}</Message>;
  }

  // Render nothing if order is not available yet
  if (!order) {
    return null;
  }

  const orderDate = new Date(order.paymentDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <ThemeProvider theme={theme}>
    <Grid container justifyContent={"center"} p={4} padding={2}>
      <Grid item xs={10} md={6} m={2}>
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontSize: 24,
            fontWeight: 600,
            color: Colors.primary,
          }}
        >
          Orderinformation
        </Typography>
        <List>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <ListItemText>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                Order#:{" "}
              </Typography>
              {order._id}
            </ListItemText>
            <ListItemText>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                Order Date:{" "}
              </Typography>
              {orderDate}
            </ListItemText>
            <ListItemText>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                Order Confirmation sent to:{" "}
              </Typography>
              <Link to={`mailto:${order.user.email}`} style={{ textDecoration: "none" }}>
                  {order.user.email}
                </Link>
            </ListItemText>
          </ListItem>
          <Divider />

          <ListItem sx={{ mt: -2, mb: 1 }}>
            <ListItemText>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: 18,
                  fontWeight: 600,
                  mt: 3,
                  mb: 1,
                  color: Colors.primary,
                }}
              >
                Shipping Address
              </Typography>
              <Typography>
        
                {order.user.name}
              </Typography>
     
              <Box sx={{ display: "flex", flexDirection: {xxxs:"column"}, gap: 0.5 }}>
            
                <Typography>{order.shippingAddress.address}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
                <Typography>{order.shippingAddress.postalCode}</Typography>
                <Typography>{order.shippingAddress.city}</Typography>
                </Box>
                <Typography>{order.shippingAddress.country}</Typography>
              </Box>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem sx={{ mt: -2, mb: 1 }}>
            <ListItemText>
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: 18,
                  fontWeight: 600,
                  mt: 3,
                  mb: 1,
                  color: Colors.primary,
                }}
              >
                Payment Method
              </Typography>
              <Typography>
                {order.paymentOptions}
              </Typography>
            </ListItemText>
          </ListItem>
        

          <Divider />

          <ListItem sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column",  alignItems: "start", gap: 1 }}>
  
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontSize: 18,
                fontWeight: 600,
                mt: 3,
                mb: 1,
                color: Colors.primary,
              }}
            >
              Order Items
            </Typography>
    
            {order.orderItems.map((item: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center",  gap: 1 }}>
                  <Box
                    component={"img"}
                    sx={{ width: 70, height: 50 }}
                    src={item.image}
                    alt={item.name}
                    title={item.name}
                    loading="lazy"
                  />

                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: { xxxs: 14, xxs: 14, xs: 14, sm: 14, md: 16 },
                      fontWeight: 500,
                      color: Colors.title,
                      marginRight: 1,
                    }}
                  >
                    {item.qty} x {item.name}
                  </Typography>
                </Box>
                {/* price of item */}
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
        </List>
      </Grid>

      <Grid item xs={10}  md={5}>
        {" "}
        <Card sx={{ position: "sticky", top: "120px", p: 2 }}>
         
            <OrderSummary cartItems={order.orderItems} taxAmount={order.taxAmount} totalPrice={order.totalPrice} shippingCost={order.shippingCost} />

        </Card>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default OrderInfoScreen;