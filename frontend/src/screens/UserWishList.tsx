import { Box, Grid, Typography } from "@mui/material";
import ProfileNavigation from "../components/ProfileNavigation";

const UserWishList = () => {
  return (
    <Box
      sx={{
        pt: 2,
        mx: { xs: 3, sm: 5, md: 8, lg: 10, xl: 18 },
        bgcolor: "white",
        height: "82vh",
        overflow: "auto",
      }}
    >
      <Grid container padding={2} spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sm={10} md={3}>
          <ProfileNavigation />
        </Grid>

        <Grid
          item
          xs={10}
          sm={10}
          md={9}
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            {" "}
            Under Construction - Coming Soon!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserWishList;
