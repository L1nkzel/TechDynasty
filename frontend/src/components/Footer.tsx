import { Box, Typography } from '@mui/material'

const Footer = () => {

    const currentYear = new Date().getFullYear();

  return (
    <Box display="flex" justifyContent="center">
        <Typography>Tech Dynasty &copy; {currentYear}</Typography>
    </Box>
  )
}

export default Footer