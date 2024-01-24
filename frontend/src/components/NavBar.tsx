import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Box,
  Stack,
  IconButton,
  createTheme,
  ThemeProvider,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserIcon from "@mui/icons-material/Person";
import Colors from "../assets/styles/Colors";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { MyDrawer } from "./MyDrawer";
import { useSelector } from "react-redux";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

// Using Inline Styling
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      height: 80,
    },

    background: Colors.header100,
  },
}));

export default function NavBar() {
  const { cartItems } = useSelector((state: any) => state.shoppingCart);
  const classes = useStyles();
  const theme = createTheme({
    breakpoints: {
      values: {
        xxs: 0,
        xs: 400,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar className={classes.root}>
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
                <Button href="/" color="inherit">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <UserIcon />
                    <Typography sx={{ fontSize: { xxs: 13, xs: 13, sm: 17 } }}>
                      Log in
                    </Typography>
                  </Box>
                </Button>
              </Box>
              <Box sx={{ display: { xxs: "block", sm: "none" } }}>
                <IconButton href="/shopping-cart" color="inherit">
                  <Badge badgeContent={cartItems.length} color="warning">
                    <ShoppingCartIcon sx={{ fontSize: { xxs: 20 } }} />
                  </Badge>
                </IconButton>
                <IconButton href="/" color="inherit">
                  <UserIcon sx={{ fontSize: { xxs: 20 } }} />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
