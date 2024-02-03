import {
  useMediaQuery,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Person as UserIcon } from "@mui/icons-material";
import { theme } from "../assets/styles/styles";
interface CustomButtonProps {
  onClick: () => void;
}

const CustomButton = ({ onClick }: CustomButtonProps) => {
  const minWidth = useMediaQuery(theme.breakpoints.up("sm"));

  if (minWidth) {
    return (
      <Button onClick={onClick} color="inherit">
        {" "}
        {/* Return a regular button */}
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
    );
  } else {
    return (
      <IconButton onClick={onClick} color="inherit">
        {" "}
        {/* Return an icon button */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <UserIcon sx={{ fontSize: { xxs: 22 } }} />
        </Box>
      </IconButton>
    );
  }
};

export default CustomButton;
