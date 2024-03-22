import Toolbar from "@material-ui/core/Toolbar";
import {
  Box,
  Stack,
  ThemeProvider,
  Typography,
  Button,
  Badge,
  AppBar,
  Theme,
  Autocomplete,
  TextField,
  ListSubheader,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { MyDrawer } from "./MyDrawer";
import { useDispatch, useSelector } from "react-redux";
import LoginRegisterModal from "./LoginRegisterModal";
import CustomButton from "./CustomButton";
import { Colors, theme } from "../assets/styles/styles";
import { setIsRegistered, setOpen } from "../slices/loginRegisterSlice";
import { AdminPanelSettings, Person, Search } from "@mui/icons-material";
import AccountMenu from "./AccountMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { resetCart } from "../slices/shoppingCartSlice";
import { RootState } from "../store";
import NavbarNavigation from "./NavbarNavigation";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const { cartItems } = useSelector((state: RootState) => state.shoppingCart);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { open, isRegistered } = useSelector(
    (state: RootState) => state.loginRegister
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
      dispatch(resetCart());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const appBarStyle = (theme: Theme) => ({
    position: "fixed",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      height: 130,
    },
    [theme.breakpoints.down("sm")]: {
      height: 120,
    },
    background: Colors.primary,
  });

  const appBarStyleAdmin = (theme: Theme) => ({
    position: "fixed",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      height: 80,
    },
    background: Colors.primary,
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={userInfo && userInfo.isAdmin ? appBarStyleAdmin : appBarStyle}
      >
        <Toolbar>
          {/* Drawer */}
          <Box
            display="flex"
            flex={1}
            alignItems={"center"}
            sx={{ mx: { xs: 1, md: 6, lg: 10, xl: 18 } }}
          >
            {userInfo && userInfo.isAdmin ? null : <MyDrawer />}
            {/*Logo */}
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Box
                component="img"
                src={Logo}
                sx={{
                  maxWidth: { xxs: 120, xs: 180, sm: 180, md: 230 },
                  mr: 2,
                  ml: -3
                }}
                alt="TechDynasty Logo"
                loading="lazy"
              />
            </Link>
            <Box
              sx={{
                display: { xxs: "none", md: "flex" },
                flex:1,
                my: "auto"
              }}
            >
              <SearchBar />
            </Box>

            {/*Navigation buttons for login and cart */}
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="end"
              sx={{ ml: 1, flex: { xxs: 1, md: 0 }}}
            >
              {!userInfo || (userInfo && !userInfo.isAdmin) ? (
                <>
                  <Box sx={{ display: { xxs: "none", sm: "block" } }}>
                    <Button
                      sx={{ ":hover": { backgroundColor: "transparent" } }}
                      disableRipple
                      component={Link}
                      to="/checkout"
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
                        <Typography
                          sx={{
                            textTransform: "none",
                            fontFamily: "Montserrat",
                            fontWeight: 500,
                            fontSize: 18,
                          }}
                        >
                          Cart
                        </Typography>
                      </Box>
                    </Button>
                  </Box>

                  <Box
                    sx={{ display: { xxs: "block", sm: "none" }, fontSize: 10 }}
                  >
                    <IconButton component={Link} to="/checkout" color="inherit">
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
                    </IconButton>
                  </Box>
                </>
              ) : null}
              {userInfo ? (
                // Logged in user
                <Box>
                  {userInfo.isAdmin ? (
                    /* Admin user */
                    <>
                      <CustomButton
                        icon={<AdminPanelSettings />}
                        text="Admin"
                        onClick={handleClick}
                      />
                      <AccountMenu
                        openAnchor={openAnchor}
                        anchorEl={anchorEl}
                        handleClose={handleClose}
                        handleLogout={handleLogout}
                      />
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </Box>
              ) : (
                /* Logged out user */
                <>
                  <CustomButton
                    icon={<Person />}
                    text="Login"
                    iconMobile={<Person />}
                    onClick={handleOpen}
                  />
                  <LoginRegisterModal
                    redirectUrl="/checkout"
                    open={open}
                    setOpen={setOpen}
                    isRegistered={isRegistered}
                    setIsRegistered={setIsRegistered}
                    setExpandedPanel={() => {}}
                  />
                </>
              )}
            </Stack>
          </Box>
        </Toolbar>
        <Box
          sx={{
            display: { xxs: "block", md: "none" },
            width: "90%",
            mx: "auto",
            mt: 0,
          }}
        >
          <SearchBar />
        </Box>
        {userInfo && userInfo.isAdmin ? null : <NavbarNavigation />}
      </AppBar>

      {userInfo && userInfo.isAdmin ? (
        <Box sx={{ minHeight: { sm: 80 } }}>
          <Toolbar />
        </Box>
      ) : (
        <Box sx={{ minHeight: { xxs: 120, sm: 130 } }}>
          <Toolbar />
        </Box>
      )}
    </ThemeProvider>
  );
}
