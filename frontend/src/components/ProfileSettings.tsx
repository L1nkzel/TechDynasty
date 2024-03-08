import { Box, Button, FormControl, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Colors, CustomTextField } from "../assets/styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/authSlice";
import { useProfileMutation } from "../slices/usersApiSlice";
import AlertBox from "./AlertBox";
import { RootState } from "../store";

const ProfileSettings = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadUpdateProfile }] =
    useProfileMutation();
  const [isOldPassError, setIsOldPassError] = useState(false);
  const [isOldPassEmpty, setIsOldPassEmpty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name,
        email: userInfo?.email,
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [userInfo.email]);

  const handleSave = async (e: any) => {
    e.preventDefault();

    if (!formData.oldPassword && formData.password) {
      setIsOldPassEmpty(true);
      console.log("Please enter your old password");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      setPasswordError(true);
      return;
    } else {
      try {
        const res = await updateProfile({
          email: formData.email,
          oldPassword: formData.oldPassword,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }).unwrap();
        dispatch(setUserInfo(res));
        setFormData({
          ...formData,
          oldPassword: "",
          password: "",
          confirmPassword: "",
        });
        setIsOldPassError(false);
        setIsOldPassEmpty(false);
        setPasswordError(false);
        setOpen(true);
      } catch (error: any) {
        console.log(error);
        if (error.data?.message === "Incorrect old password") {
          setIsOldPassError(true);
        }
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 2 }}>
        Profile Settings
      </Typography>
      <Typography sx={{ fontSize: 12, fontWeight: 400, mb: 2 }}>
        Customer id: {userInfo._id}
      </Typography>
      <Box>
        <FormControl fullWidth>
          <CustomTextField
            size="small"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled
            label="Name"
            name="name"
            InputLabelProps={{ shrink: true }}
          />
          <Typography
            sx={{ color: Colors.title, fontSize: 12, fontWeight: 400, mb: 2 }}
          >
            Contact us if you want to change your name{" "}
          </Typography>
        </FormControl>
        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 2 }}>
          Update your profile information
        </Typography>
        <FormControl fullWidth>
          <CustomTextField
            size="small"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            label="Email"
            type="email"
            name="email"
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <CustomTextField
            size="small"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            label="Old Password"
            type="password"
            name="oldPassword"
            error={isOldPassError || isOldPassEmpty}
            helperText={
              (isOldPassError && "Incorrect old password") ||
              (isOldPassEmpty && "Please enter your old password")
            }
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <CustomTextField
            size="small"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            label="New Password"
            type="password"
            name="password"
            error={passwordError}
            helperText={passwordError && "Passwords do not match"}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl fullWidth>
          <CustomTextField
            size="small"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            error={passwordError}
            helperText={passwordError && "Passwords do not match"}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <Button
          onClick={handleSave}
          size="small"
          variant="contained"
          sx={{ mt: 1, bgcolor: Colors.secondary, "&:hover": {
            backgroundColor: Colors.secondaryLight, 
            color:  "whitesmoke",
          }, textTransform: "none" }}
        >
          Save
        </Button>
        {loadUpdateProfile && (
          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 2 }}>
            Updating profile...
          </Typography>
        )}
      </Box>
      <AlertBox open={open} setOpen={setOpen} text="Profile updated successfully!"/>
    </Box>
  );
};

export default ProfileSettings;
