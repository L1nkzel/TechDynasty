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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserIcon from "@mui/icons-material/Person";
import Colors from "../assets/styles/Colors";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { MyDrawer } from "./MyDrawer";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs:true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

// Using Inline Styling
const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    background: Colors.header100,
  },
  menuButton: {},
}));


export default function NavBar() {
  const classes = useStyles();


  const theme = createTheme({
    breakpoints: {
      values: {
        xxs: 0 ,
        xs: 400,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      }
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
              sx={{ maxWidth: {xxs:130, xs: 180, sm: 230 } }}
            />
          </Link>
          
          {/*Navigation buttons for login and cart */}
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="end"
            flexGrow={1}
          >
            <Box sx={{ display: { xxs: "none", sm: "block"}}}>
              <Button href="/" color="inherit">
                <ShoppingCartIcon />
                <Typography sx={{ fontSize: { xxs: 13, xs: 13, sm: 17}}}>Cart</Typography>
              </Button>
              <Button href="/" color="inherit">
                <UserIcon  />
                <Typography sx={{ fontSize: { xxs: 13, xs: 13, sm: 17}}}>Log in</Typography>
              </Button>
            </Box>
            <Box sx={{ display: { xxs: "block", sm: "none" }}}>
              <IconButton href="/" color="inherit" >
                <ShoppingCartIcon
                sx={{ fontSize: {xxs: 20}}}
                />
              </IconButton>
              <IconButton href="/" color="inherit">
                <UserIcon sx={{ fontSize: {xxs: 20}}}/>
              </IconButton>
              </Box>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}
