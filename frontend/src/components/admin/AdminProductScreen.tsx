import NavigationDashboard from './NavigationDashboard'
import { Box, Grid } from '@mui/material'
import ManageProducts from './ManageProducts'

const AdminProductScreen = () => {
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
    <Grid container padding={2} spacing={2} sx={{ justifyContent: "center" }}>
      <Grid item xs={11} sm={10} md={3}>
        <NavigationDashboard />
      </Grid>

      <Grid item xs={11} sm={10} md={9} sx={{ mt: 2 }}>
        <ManageProducts />
      </Grid>
    </Grid>
  </Box>
  )
}

export default AdminProductScreen