import { Box, Grid } from "@mui/material";
import AdminNavigation from "./AdminNavigation";
import ManageUsersTable from "./ManageUsersTable";

const AdminUsersScreen = () => {
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

      <Grid item xs={11} sm={10} md={9} sx={{ mt: 2 }}>
        <ManageUsersTable />
      </Grid>
    </Grid>
  );
};

export default AdminUsersScreen;