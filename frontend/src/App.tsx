import { Box } from "@mui/material";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./assets/styles/main.css";
import HomeScreen from "./screens/HomeScreen";
const App = () => {
  return (
    <>
      <Header />
      <Box minHeight="82vh">
        <HomeScreen />
      </Box>
      <Footer />
    </>
  );
};

export default App;
