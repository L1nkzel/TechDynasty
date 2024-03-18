import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import Message from "../Message";
import AdminNavigation from "./AdminNavigation";
import { Colors, CustomTextField } from "../../assets/styles/styles";
import { errorDisplayMessage } from "../errorDisplayMessage";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditUserMutation,
  useGetUserByIdQuery,
} from "../../slices/usersApiSlice";

const EditUserScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(userId);
  const [editUser, { isLoading: loading }] = useEditUserMutation();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await editUser({ _id: userId, ...userData }).unwrap();
      refetch();
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Message severity="error">{errorDisplayMessage(error)}</Message>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            px: 2,
            pt: 2,
            justifyContent: { xs: "center", md: "start" },
            height: "82vh",
            overflow: "auto",
          }}
        >
          <Grid
            item
            xs={11}
            sm={10}
            md={3.5}
            lg={3}
            sx={{ p: 2, bgcolor: "white" }}
          >
            <AdminNavigation />
          </Grid>

          <Grid
            item
            xs={11}
            sm={9}
            md={4}
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: { xs: "center", sm: "center", md: "start" },
            }}
          >
            <Box sx={{ mb: 4, width: "100%" }}>
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                Edit User
              </Typography>
              <Typography
                sx={{
                  width: { md: 200, lg: 300 },
                  fontSize: 14,
                  fontWeight: 400,
                  color: "gray",
                  mb: 2,
                }}
              >
                Fill in the form below to edit a product
              </Typography>

              <FormControl fullWidth>
                <CustomTextField
                  size="small"
                  value={userData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  label="Name"
                  name="name"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>

              <FormControl fullWidth>
                <CustomTextField
                  size="small"
                  value={userData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                  label="Email"
                  name="email"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>

              {loading && (
                <LinearProgress sx={{ display: "flex", margin: "auto" }} />
              )}
              <Button
                size="large"
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  mt: 1,
                  width: "100%",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: Colors.secondaryLight,
                    color: "white",
                  },
                  backgroundColor: Colors.secondary,
                  color: "white",
                }}
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default EditUserScreen;
