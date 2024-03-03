import {
  useMediaQuery,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { theme } from "../assets/styles/styles";
interface CustomButtonProps {
  onClick?: any;
  component?: any;
  to?: string;
  icon?: JSX.Element;
  iconMobile?: JSX.Element;
  text: string;
}

const CustomButton = ({
  onClick,
  component,
  to,
  icon,
  iconMobile,
  text,
}: CustomButtonProps) => {
  const minWidth = useMediaQuery(theme.breakpoints.up("sm"));

  if (minWidth) {
    return (
      <Button
        sx={{ ":hover": { backgroundColor: "transparent" } }}
        disableRipple
        component={component}
        to={to!}
        onClick={onClick}
        color="inherit"
      >
        {" "}
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          {icon}
          <Typography
            sx={{
              textTransform: "none",
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: 18,
            }}
          >
            {text}
          </Typography>
        </Box>
      </Button>
    );
  } else {
    return (
      <IconButton component={component} to={to!} onClick={onClick} color="inherit">
        {" "}
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box sx={{ fontSize: { xxs: 10 } }}>{iconMobile}</Box>
        </Box>
      </IconButton>
    );
  }
};

export default CustomButton;
