import { Close, Email } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../slices/usersApiSlice";
import { setUserInfo, registerUser } from "../slices/authSlice";
import PasswordFields from "./PasswordFields";
import { Colors, CustomTextField, theme } from "../assets/styles/styles";

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
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setPasswordError(false);
    setPasswordsMatch(true);
    setNameIsEmpty(false);
    setEmailIsValid(true);
    setUserExists(false);
  };

  const handleClose = () => {
    dispatch(setOpen(false));
    resetFormData();
  };

  const toggleRegistration = () => {
    dispatch(setIsRegistered(!isRegistered));
    resetFormData();
  };
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await login({
        email: formData.email.toLowerCase(),
        password: formData.password,
      }).unwrap();
      dispatch(setUserInfo({ ...res }));
      if (redirectUrl === "/shopping-cart") {
        navigate("/shipping");
      }
      dispatch(setOpen(false));
    } catch (error: ErrorResponse | any) {
      if (error.status === 401) {
        setEmailIsValid(false);
        setPasswordError(true);
        return;
      } else {
        console.log(error);
      }
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    // Validate form data
    const isNameEmpty = formData.name === "";
    const isEmailValid = formData.email === "" ? false : isValidEmail(formData.email);
    const isPasswordError = formData.password === "" || formData.password.length < 6;
    const doPasswordsMatch = formData.password === formData.confirmPassword;

    // Update state with validation results
    setNameIsEmpty(isNameEmpty);
    setEmailIsValid(isEmailValid);
    setPasswordError(isPasswordError);
    setPasswordsMatch(doPasswordsMatch);

    // Check if there are any validation errors
    if (isNameEmpty || !isEmailValid || isPasswordError || !doPasswordsMatch) {
      return;
    }

    try {
      const registerResponse = await register({
        name: formData.name,
        email: formData.email.toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      // Registration successful
      dispatch(registerUser({ ...registerResponse }));
      dispatch(setOpen(false));
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }));
    } catch (error: ErrorResponse | any) {
      if (error.data.message === "User already exists") {
        setUserExists(true);
        console.log("User exists:", userExists);
      }
    }
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
              error={isRegistered && nameIsEmpty}
              helperText={isRegistered && nameIsEmpty && "Name cannot be empty"}
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
            error={
              (isRegistered && userExists) ||
              (isRegistered && !emailIsValid) ||
              (!isRegistered && passwordError)
            } 
            helperText={
              (isRegistered && userExists && "User already exists") ||
              (isRegistered && !emailIsValid ? "Invalid Email Format" : "")
            } 
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
              error:
                (isRegistered && (!passwordsMatch || passwordError)) ||
                (!isRegistered && passwordError),
              helperText:
                !isRegistered &&
                passwordError &&
                "Email or Password is invalid",
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
                error: isRegistered && (!passwordsMatch || passwordError),
                helperText:
                  isRegistered && !passwordsMatch
                    ? "Passwords do not match"
                    : "" || (isRegistered && passwordError)
                    ? "Password must be at least 6 characters"
                    : "",
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
