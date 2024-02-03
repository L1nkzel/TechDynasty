import Toolbar from "@material-ui/core/Toolbar";
import {
  Box,
  Stack,
  IconButton,
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

export default function NavBar() {
  const { cartItems } = useSelector((state: any) => state.shoppingCart);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { open, isRegistered } = useSelector(
    (state: any) => state.loginRegister
  );
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setOpen(true));
    dispatch(setIsRegistered(false));
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
                <Button href="/shopping-cart" color="inherit">
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
                    <Typography sx={{ fontSize: { xxs: 13, xs: 13, sm: 17 } }}>
                      Cart
                    </Typography>
                  </Box>
                </Button>
              </Box>
              <Box sx={{ display: { xxs: "block", sm: "none" } }}>
                <IconButton href="/shopping-cart" color="inherit">
                  <Badge
                    sx={{ fontSize: 10 }}
                    badgeContent={cartItems.reduce(
                      (a: number, c: any) => a + c.qty,
                      0
                    )}
                    color="warning"
                  >
                    <ShoppingCartIcon sx={{ fontSize: { xxs: 22 } }} />
                  </Badge>
                </IconButton>
              </Box>
              {userInfo ? (
                <Button color="inherit">
                  <Typography sx={{ fontSize: { xxs: 13, xs: 13, sm: 17 } }}>
                    {userInfo.name}
                  </Typography>
                </Button>
              ) : (
                <>
                  <CustomButton onClick={handleOpen} />
                  <LoginRegisterModal
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
