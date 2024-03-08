import AdminNavigation from './AdminNavigation'
import { Box, Grid } from '@mui/material'
import Products from './Products'

const AdminProductScreen = () => {
  
  return (
    <Box
    sx={{
      pt: 2,
      height: "82vh",
      overflow: "auto",
    }}
  >
    <Grid container spacing={2} sx={{px:2,  justifyContent: "center" }}>
      <Grid item xs={11} sm={10} md={3} sx={{px:2, bgcolor: "white" }}>
        <AdminNavigation />
      </Grid>

      <Grid item xs={11} sm={12} md={9} sx={{ mt: 4,  }}>
        <Products />
      </Grid>
    </Grid>
  </Box>
  )
}

export default AdminProductScreen