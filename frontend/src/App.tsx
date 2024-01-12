import { Box } from "@mui/material";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./assets/styles/main.css";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <Header />
      <Box minHeight="82vh">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default App;
