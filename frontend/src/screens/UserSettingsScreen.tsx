import { Box, Grid } from "@mui/material";
import ProfileNavigation from "../components/ProfileNavigation";
import ProfileSettings from "../components/ProfileSettings";

const UserSettingsScreen = () => {
  return (
    <Box
      sx={{
        pt: 2,
        mx: { xs: 3, sm: 5, md: 10 },
        bgcolor: "white",
        height: "82vh",
        overflow: "auto",
      }}
    >
      <Grid
        container
        padding={2}
        spacing={2}
        sx={{ justifyContent: { xxs: "center", xs: "center", sm: "start" } }}
      >
        <Grid item xs={10} sm={4} md={3} sx={{ mr: { xs: 0, sm: 2 } }}>
          <ProfileNavigation />
        </Grid>

        <Grid
          item
          xs={10}
          sm={7}
          md={7}
          sx={{ mt: 2, display: "flex", alignItems: "center" }}
        >
          <ProfileSettings />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserSettingsScreen;
