import Toolbar from "@material-ui/core/Toolbar";
import {
  Box,
  Stack,
  ThemeProvider,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { MyDrawer } from "./MyDrawer";
import { useDispatch, useSelector } from "react-redux";
import LoginRegisterModal from "./LoginRegisterModal";
import CustomButton from "./CustomButton";
import { CustomAppBar, theme } from "../assets/styles/styles";
import { setIsRegistered, setOpen } from "../slices/loginRegisterSlice";
import { Person } from "@mui/icons-material";
import AccountMenu from "./AccountMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

export default function NavBar() {
  const { cartItems } = useSelector((state: any) => state.shoppingCart);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { open, isRegistered } = useSelector(
    (state: any) => state.loginRegister
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAnchor = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUserApiCall]: any = useLogoutMutation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    dispatch(setOpen(true));
    dispatch(setIsRegistered(false));
  };

  const handleLogout = async () => {
    try {
      await logoutUserApiCall().unwrap();
      dispatch(logout({}));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomAppBar>
        <Toolbar>
          {/* Drawer */}
          <MyDrawer />
          <Box display="flex" flex={1} alignItems={"center"}>
            {/*Logo */}
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Box
                component="img"
                src={Logo}
                sx={{ maxWidth: { xxs: 120, xs: 180, sm: 230 } }}
                alt="TechDynasty Logo"
                loading="lazy"
              />
            </Link>

            {/*Navigation buttons for login and cart */}
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="end"
              flexGrow={1}
            >
              <Box sx={{ display: { xxs: "none", sm: "block" } }}>
                <Button
                  sx={{ ":hover": { backgroundColor: "transparent" } }}
                  disableRipple
                  href="/checkout"
                  color="inherit"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    {cartItems.length > 0 ? (
                      <Badge
                        badgeContent={cartItems.reduce(
                          (a: number, c: any) => a + c.qty,
                          0
                        )}
                        color="warning"
                      >
                        <ShoppingCartIcon />
                      </Badge>
                    ) : (
                      <ShoppingCartIcon />
                    )}
                    <Typography>Cart</Typography>
                  </Box>
                </Button>
              </Box>
              <Box sx={{ display: { xxs: "block", sm: "none" }, fontSize: 10 }}>
                <CustomButton
                  iconMobile={<ShoppingCartIcon />}
                  text="Cart"
                  href="/checkout"
                      
                />
              </Box>

              {userInfo ? (
                // Logged in user
                <Box>
                  <CustomButton
                    icon={<Person />}
                    text="Profile"
                    iconMobile={<Person />}
                    onClick={handleClick}
                  />
                  <AccountMenu
                    openAnchor={openAnchor}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    handleLogout={handleLogout}
                  />
                </Box>
              ) : (
                /* Logged out user */
                <>
                  <CustomButton
                    icon={<Person />}
                    text="Log in"
                    iconMobile={<Person />}
                    onClick={handleOpen}
                  />
                  <LoginRegisterModal
                    redirectUrl="/checkout"
                    open={open}
                    setOpen={setOpen}
                    isRegistered={isRegistered}
                    setIsRegistered={setIsRegistered}
                  />
                </>
              )}
            </Stack>
          </Box>
        </Toolbar>
      </CustomAppBar>
    </ThemeProvider>
  );
}
