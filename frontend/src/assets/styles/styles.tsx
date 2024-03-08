import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { AppBar, Button, TextField } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xxxs: 0,
      xxs: 0,
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
  
export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    height: 100,
  },
  background: Colors.primary,
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  // Add your custom styles here
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.7),
  marginBottom: theme.spacing(0.7),
}));

export const IncDecButton = styled(Button)(({ theme }) => ({
  borderRadius: "50%",
  fontSize: "small",
  padding: "10px",
  maxWidth: "24px",
  maxHeight: "24px",
  minWidth: "unset",
  minHeight: "unset",
  "&:hover": { backgroundColor: Colors.secondaryLight },
  backgroundColor: Colors.secondary,
}));

export const DeliveryInfoContainer = styled("form")(({ theme }) => ({
  // good looking form container
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    width: 400,
  },
  [theme.breakpoints.up("md")]: {
    width: 400,
  },
  [theme.breakpoints.up("lg")]: {
    width: 400,
  },
  [theme.breakpoints.up("xl")]: {
    width: 400,
  },
}));

export const Colors = {
  primary: "#303436",
  primaryLight: "#484e51",
  highlight: "#e4e6e7",
  secondary: "#40b9bf",
  secondaryLight: "#66c7cc",
  modal: "#cee5ce",
  title: "#595959"
};

//#006080 primary2