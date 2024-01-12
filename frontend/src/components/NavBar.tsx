import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { List, ListItem, ListItemText, Collapse, Box} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserIcon from "@mui/icons-material/Person";
import Colors from "../assets/styles/Colors";
import { Link } from "react-router-dom";


// Using Inline Styling
const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    background: Colors.header100,
  },
  menuButton: {
    display: "flex",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const small = useMediaQuery("(max-width:600px)");
  const full = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {small && (
          <Box flex={1}>
            <Box display={"flex"}>

              <Typography variant="h6" color="inherit" component={"div"}>
                Tech Dynasty
              </Typography>
              <Box className={classes.menuButton}>
                <Button style={{ color: "white" }} onClick={handleClick}>
                  <MenuIcon />
                </Button>
              </Box>
            </Box>
            <Collapse in={open} timeout="auto">
              <List component="div" disablePadding>
                <Link to="/" style={{color: "white", textDecoration: "none"}}>
                  <ListItem>
                    <ListItemText primary="Cart" />
                  </ListItem>
                </Link>
                <Link to="/" style={{color: "white", textDecoration: "none"}}>
                  <ListItem>
                    <ListItemText primary="Log in" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </Box>
        )}

        {full && (
          <Box display="flex" flexGrow={1}>
            <Link to="/" style={{color: "white", textDecoration: "none"}}>
            <Typography variant="h6">
              Tech Dynasty
            </Typography>
            </Link>
            <Box display="flex" justifyContent="end" flexGrow={1}>
              <Button href="/" color="inherit">
                <ShoppingCartIcon />
                Cart
              </Button>

              <Button href="/" color="inherit">
                <UserIcon />
                Log in
              </Button>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}