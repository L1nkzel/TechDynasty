import {
  Close,
  Email,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import Logo from "../assets/logo.png";
import { ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setUserInfo } from "../slices/authSlice";
import PasswordFields from "./PasswordFields";
import { Colors, CustomTextField, theme } from "../assets/styles/styles";


interface ErrorResponse {
  data: {
    message: string;
  };
  error: string;
}

const LoginRegisterModal = ({
  open,
  setOpen,
  isRegistered,
  setIsRegistered,
  redirectUrl,
}: {
  open: boolean;
  setOpen: any;
  isRegistered: boolean;
  setIsRegistered: any;
  redirectUrl?: string;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const toggleRegistration = () => {
    dispatch(setIsRegistered(!isRegistered));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(setUserInfo({ ...res }));
      if (redirectUrl === "/shopping-cart") {
        navigate("/shipping");
      }
      dispatch(setOpen(false));
    } catch (err: ErrorResponse | any) {}
  };

  const handleRegister = () => {
    console.log("Registration clicked");
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <CustomButton onClick={handleOpen} /> */}
      <Dialog
        PaperProps={{
          sx: {
            background: `linear-gradient(to top, ${Colors.modal100}, #FBFBFB)`,
            width: 400,
            borderRadius: 2,
          },
        }}
        sx={{
          backdropFilter: "blur(3px)",
          bgColor: "rgba(0,0,30,0.4)",
        }}
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: Colors.header100,
            p: { xxs: 0.8, xs: 1.5 },
          }}
        >
          <Box
            component="img"
            src={Logo}
            sx={{ maxWidth: { xxs: 160, xs: 180, sm: 200 } }}
          />
          <IconButton
            sx={{ width: 40, height: 40, color: "white" }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Box>
        {/* Dialog Header */}
        {isRegistered ? (
          <DialogTitle>Register</DialogTitle>
        ) : (
          <DialogTitle>Log in</DialogTitle>
        )}

        {/* Dialog Content */}
        <DialogContent>
          {isRegistered! && (
            <CustomTextField
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
              autoFocus
              label="Name"
              placeholder="Name"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          <CustomTextField
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            fullWidth
            label="Email"
            placeholder="Email"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <PasswordFields
            {...{
              password: formData.password,
              onChange: (value) => {
                setFormData({ ...formData, password: value });
              },
              id: "password",
              label: "Password",
            }}
          />
          {isRegistered && (
            <PasswordFields
              {...{
                password: formData.confirmPassword,
                onChange: (value) => {
                  setFormData({ ...formData, confirmPassword: value });
                },
                id: "confirmPassword",
                label: "Confirm Password",
              }}
            />
          )}
          {/* Dialog Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              gap: 1,
            }}
          >
            {isRegistered ? (
              <Button fullWidth variant="contained" onClick={handleRegister}>
                {isRegistered ? "Register" : "Log in"}
              </Button>
            ) : (
              <Button fullWidth variant="contained" onClick={handleLogin}>
                {isRegistered ? "Register" : "Log in"}
              </Button>
            )}

            <Button
              sx={{ ":hover": { backgroundColor: "transparent" } }}
              disableRipple
              onClick={toggleRegistration}
            >
              {isRegistered
                ? "Already have an account?"
                : "Don't have an account?"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default LoginRegisterModal;
