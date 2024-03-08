import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Colors } from "../assets/styles/styles";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";

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

const ProfileNavigation = () => {
    const isOrdersScreen = location.pathname === "/profile/orders";
    const isWishlistScreen = location.pathname === "/profile/wishlist";
    const isSettingsScreen = location.pathname === "/profile/settings";


  const getButtonStyles = (isFocused: boolean) => ({
    ...buttonStyles,
    backgroundColor: isFocused ? Colors.secondary : Colors.highlight,
    color: isFocused ? "whitesmoke" : Colors.primary,
    "&:hover": {
        backgroundColor: Colors.secondaryLight, 
        color:  "whitesmoke",
      },
  });

  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>My Profile</Typography>

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
          to="/profile/orders"
          variant="contained"
          sx={getButtonStyles(isOrdersScreen)}

        >
          <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography
            sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
          >
            {" "}
            Orders
          </Typography>
        </Button>
        <Button
          component={Link}
          to="/profile/wishlist"
          variant="contained"
          sx={getButtonStyles(isWishlistScreen)}

        >
          <FavoriteIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography
            sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
          >
            Wishlist
          </Typography>
        </Button>
        <Button
          component={Link}
          to="/profile/settings"
          variant="contained"
          sx={getButtonStyles(isSettingsScreen)}

        >
          <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography
            sx={{ textTransform: "none", fontSize: 14, fontWeight: 500 }}
          >
            Settings
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileNavigation;
