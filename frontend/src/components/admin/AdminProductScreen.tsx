import AdminNavigation from "./AdminNavigation";
import { Grid } from "@mui/material";
import Products from "./Products";

const AdminProductScreen = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        px: 2,
        pt: 2,
        justifyContent: "center",
        height: "82vh",
        overflow: "auto",
      }}
    >
      <Grid item xs={11} sm={10} md={3} sx={{ p: 2, bgcolor: "white" }}>
        <AdminNavigation />
      </Grid>

      <Grid item xs={11} sm={12} md={9} sx={{ mt: 4 }}>
        <Products />
      </Grid>
    </Grid>
  );
};

export default AdminProductScreen;
