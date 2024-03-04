import { Colors } from '../../assets/styles/styles';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ManageOrders from '@mui/icons-material/ListAlt';
import PersonIcon from "@mui/icons-material/PersonOutlined";
import ManageProducts from '@mui/icons-material/AddShoppingCart';
import SettingsIcon from "@mui/icons-material/SettingsOutlined";



const buttonStyles = {
    width: "100%",
    height: 40,
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: Colors.secondaryLight,
      color: "whitesmoke",
    },
    backgroundColor: Colors.primaryLight,
    color: Colors.primary,
  };
const NavigationDashboard = () => {
    const isOrdersScreen = location.pathname === "/admin/orders";
    const isUsersScreen = location.pathname === "/admin/users";
    const isProductsScreen = location.pathname === "/admin/products";
    const isSettingsScreen = location.pathname === "/admin/settings";

    const getButtonStyles = (isFocused: boolean) => ({
        ...buttonStyles,
        backgroundColor: isFocused ? Colors.primary : Colors.primaryLight,
        color: isFocused ? "whitesmoke" : Colors.primary,
        "&:hover": {
            backgroundColor: Colors.secondaryLight, 
            color:  "whitesmoke",
          },
      });

  return (
    <Box>
    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Admin Dashboard</Typography>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        mt: 2,
        gap: 1,
      }}
    >
      <Button
        component={Link}
        to="/admin/orders"
        variant="contained"
        sx={getButtonStyles(isOrdersScreen)}

      >
        <ManageOrders sx={{ mr: 1, fontSize: 20 }} />
        <Typography
          sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
        >
          {" "}
          Manage Orders
        </Typography>
      </Button>
      <Button
        component={Link}
        to="/admin/users"
        variant="contained"
        sx={getButtonStyles(isUsersScreen)}

      >
        <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
        <Typography
          sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
        >
          {" "}
          Manage Users
        </Typography>
      </Button>
      <Button
        component={Link}
        to="/admin/products"
        variant="contained"
        sx={getButtonStyles(isProductsScreen)}

      >
        <ManageProducts sx={{ mr: 1, fontSize: 20 }} />
        <Typography
          sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
        >
          {" "}
          Manage Products
        </Typography>
      </Button>
      <Button
        component={Link}
        to="/admin/settings"
        variant="contained"
        sx={getButtonStyles(isSettingsScreen)}

      >
        <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
        <Typography
          sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
        >
          {" "}
          Settings
        </Typography>
      </Button>

    </Box>
  </Box>
  )
}

export default NavigationDashboard