import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Colors } from "../assets/styles/styles";
import PhoneIcon from '@mui/icons-material/Phone';

const NavbarNavigation = () => {
  return (
    <Box
      sx={{
        display: { xxs: "none", md: "flex" },
        bgcolor: Colors.primaryLight,
        width: "100%",
        p: 1,
        position: "sticky",
        top: 130,
        justifyContent: "space-between",
 
        flexDirection: { xs: "column", md: "row" }, // Change flex direction
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }} // Change direction based on screen size
        spacing={2}
        sx={{
          ml: { xs: 3, sm: 5, md: 6, lg: 10, xl: 18 },
          alignSelf: "flex-start", 
        }}
      >
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          Home
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/tvs">
          Tv's
        </Link>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to="/computers"
        >
          Computers
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/cameras">
          Cameras
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/phones">
          Phones & Tablets
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/gaming">
          Gaming
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/sound">
          Sound
        </Link>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mr: { xs: 3, sm: 5, md: 7, lg: 12, xl: 20 },
          alignSelf: "flex-end",
          alignItems: "center",
        }}
      >
        <Link style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center" }} to="tel:+1234567890">
          <PhoneIcon sx={{mr: {xs: 0, lg: 1}, fontSize: 20, color: "white" }} />
          <Typography sx={{ display: { xs: "none", lg: "block" }}}> +467 12 34 56 78</Typography>
         
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="mailto:info@techdynasty.com">
          info@techdynasty.com
        </Link>
      </Stack>
    </Box>
  );
};

export default NavbarNavigation;
