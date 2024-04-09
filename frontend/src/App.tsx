import { Box } from "@mui/material";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./assets/styles/main.css";
import { Outlet } from "react-router-dom";
const App = () => {
  
  return (
    <Box >
      <Header/>
      <Box
        sx={{
          minHeight: "82vh",
        }}
      >
        <Box sx={{ mx: { xs: 0, md: 6, lg: 10, xl: 18 }, bgcolor: "white", minHeight: "82vh" }}>
        <Outlet/>
      </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
