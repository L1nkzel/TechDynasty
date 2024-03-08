import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Colors } from "../assets/styles/styles";

const NavbarNavigation = () => {
  return (
    <>
    
    <Stack
      direction="row"
      spacing={2}
      sx={{
        bgcolor: Colors.primaryLight,
        width: "100%",
        p: 1,
        justifyContent: "center",
        borderBottom: "1px solid black",
      }}
    >
      <Link style={{ color: "white", textDecoration: "none" }} to="/">Home</Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/tvs">Tv's</Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/computers">Computers</Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/cameras">Cameras</Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/phones">Phones & Tablets</Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/gaming">Gaming</Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/sound">Sound</Link>
    </Stack>
    </>
  );
};

export default NavbarNavigation;
