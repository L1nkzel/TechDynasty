import { Box } from "@mui/material";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./assets/styles/main.css";
import { Outlet } from "react-router-dom";
const App = () => {
  
  return (
    <Box>
      <Header/>
      <Box
        minHeight="82vh"
        sx={{ bgcolor: "#f5f5f5" }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
