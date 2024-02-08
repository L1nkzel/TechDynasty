import {
  useMediaQuery,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { theme } from "../assets/styles/styles";
interface CustomButtonProps {
  onClick?: any;
  href?: string;
  icon?: JSX.Element;
  iconMobile?: JSX.Element;
  text: string;
}

const CustomButton = ({ onClick, href, icon, iconMobile, text }: CustomButtonProps) => {
  const minWidth = useMediaQuery(theme.breakpoints.up("sm"));

  if (minWidth) {
    return (
      <Button sx={{ ":hover": { backgroundColor: "transparent" } }} disableRipple href={href} onClick={onClick} color="inherit">
        {" "}
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          {icon}
          <Typography >
            {text}
          </Typography>
        </Box>
      </Button>
    );
  } else {
    return (
      <IconButton href={href!} onClick={onClick} color="inherit">
        {" "}
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box sx={{ fontSize: { xxs: 10 } }} >
            {iconMobile}
          </Box>
        </Box>
      </IconButton>
    );
  }
};

export default CustomButton;
