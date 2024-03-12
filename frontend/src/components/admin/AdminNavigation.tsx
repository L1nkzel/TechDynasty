import { Colors } from "../../assets/styles/styles";
import { Box, Button, ButtonGroup, Collapse, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ManageOrders from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import ManageProducts from "@mui/icons-material/AddShoppingCart";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

const buttonStyles = {
  width: "100%",
  height: 40,
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: Colors.secondaryLight,
    color: "whitesmoke",
  },
  backgroundColor: Colors.highlight,
  color: Colors.primary,
};

const buttonNavigationStyles = {
  borderLeft: 1,
  "&:hover": {
    backgroundColor: Colors.secondaryLight,
    color: "whitesmoke",
  },
  backgroundColor: Colors.highlight,
  color: Colors.primary,
};
const AdminNavigation = () => {
  const isDashboardScreen = location.pathname === "/admin/dashboard";
  const isOrdersScreen = location.pathname === "/admin/orders";
  const isUsersScreen = location.pathname === "/admin/users";
  const isProductsScreen = location.pathname === "/admin/products";
  const isAddProductsScreen =
    location.pathname === "/admin/products/addProduct";
  location.pathname === "/admin/products/AddProduct";
  const isSettingsScreen = location.pathname === "/admin/settings";

  const getButtonStyles = (isFocused: boolean) => ({
    ...buttonStyles,
    backgroundColor: isFocused ? Colors.primaryLight : Colors.highlight,
    color: isFocused ? "whitesmoke" : Colors.primary,
    "&:hover": {
      backgroundColor: Colors.secondaryLight,
      color: "whitesmoke",
    },
  });
  const getButtonNavigationStyles = (isFocused: boolean) => ({
    ...buttonNavigationStyles,
    backgroundColor: isFocused ? Colors.primaryLight : Colors.highlight,
    color: isFocused ? "whitesmoke" : Colors.primary,
    "&:hover": {
      backgroundColor: Colors.secondaryLight,
      color: "whitesmoke",
    },
  });

  const [open, setOpen] = useState(isAddProductsScreen);
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ position:"sticky", top: 0}}>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
        Admin Panel
      </Typography>

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
          to="/admin/dashboard"
          variant="contained"
          sx={getButtonStyles(isDashboardScreen)}
        >
          <DashboardOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography
            sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
          >
            {" "}
            Dashboard
          </Typography>
        </Button>
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
      <ButtonGroup >
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
            onClick={handleClick}
            variant="contained"
            sx={getButtonNavigationStyles(isProductsScreen)}
          >
            {open ? (
              <KeyboardArrowDownIcon
                sx={{ fontSize: 20 }}
              />
            ) : (
              <KeyboardArrowRightIcon
                sx={{ fontSize: 20 }}
              />
            )}
          </Button>
        </ButtonGroup>

        <Collapse in={open} timeout={30} unmountOnExit>
          <Button
            component={Link}
            to="/addProduct"
            variant="contained"
            sx={{ ...getButtonStyles(isAddProductsScreen), width: "100%" }}
          >
            <AddCircleOutlineOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
            <Typography
              sx={{
                textTransform: "none",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {" "}
              Add Product
            </Typography>
          </Button>
        </Collapse>

        <Button
          component={Link}
          to="/admin/settings"
          variant="contained"
          sx={getButtonStyles(isSettingsScreen)}
        >
          <AnalyticsOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography
            sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
          >
            {" "}
            Statistics
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default AdminNavigation;
