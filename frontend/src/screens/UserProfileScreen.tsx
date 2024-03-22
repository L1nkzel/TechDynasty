import { Box, Grid } from "@mui/material";
import ProfileNavigation from "../components/ProfileNavigation";
import OrderTable from "../components/OrderTable";

const UserProfileScreen = () => {
  return (
    <Box
      sx={{
        pt: 2,
        mx: { xs: 0, md: 6, lg: 10, xl: 18 },
        bgcolor: "white",
        height: "82vh",
        overflow: "auto",
      }}
    >
      <Grid container padding={2} spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={11} sm={10} md={3}>
          <ProfileNavigation />
        </Grid>

        <Grid item xs={11} sm={10} md={9} sx={{ mt: 2 }}>
          <OrderTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfileScreen;
