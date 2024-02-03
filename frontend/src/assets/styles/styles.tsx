import { createTheme,} from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import { AppBar, TextField } from "@mui/material";


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
  position: 'fixed',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    height: 80,
  },
  background: Colors.header100,
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  // Add your custom styles here
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.7),
  marginBottom: theme.spacing(0.7),
  
}));

export const Colors = {
  header100: "#00695C",
  header200: "#81C784",
  cell100: "#C8E6C9",
  modal100: "#cee5ce"
  
};

