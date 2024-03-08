import { Box, Grid } from "@mui/material"
import AdminNavigation from "./AdminNavigation"
import ManageOrdersTable from "./ManageOrdersTable"


const AdminOrderScreen = () => {
  return (
    <Box
    sx={{
      pt: 2,
      height: "82vh",
      overflow: "auto",
    }}
  >
    <Grid container spacing={2} sx={{px:2, justifyContent: "center" }}>
      <Grid item xs={11} sm={10} md={3} sx={{ px: 2, bgcolor: "white", height: "100vh" }}>
        <AdminNavigation />
      </Grid>

      <Grid item xs={11} sm={10} md={9} sx={{ mt: 2 }}>
        <ManageOrdersTable />
      </Grid>
    </Grid>
  </Box>
  )
}

export default AdminOrderScreen