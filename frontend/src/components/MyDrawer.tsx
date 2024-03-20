import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Colors } from "../assets/styles/styles";
import TvIcon from "@mui/icons-material/Tv";
import ComputerIcon from "@mui/icons-material/Computer";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HeadphonesIcon from "@mui/icons-material/Headphones";

export function MyDrawer() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box >
      <IconButton sx={{display: { xxs: "flex", md: "none"}, color: "white", mr: 3, ml:{xxs:-2, xs:-4} }} onClick={handleClick}>
        <MenuIcon sx={{ fontSize: { xxs: 22, xs: 28, sm: 32 } }} />
      </IconButton>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        PaperProps={{
          sx: { minWidth: 250, width: { xxs: 250, xs: 350 } },
        }}
      >
        <Box
          sx={{ height: 80, bgcolor: Colors.primary }}
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DialogTitle sx={{ color: "white"}}>
            Category
          </DialogTitle>
          <Box display="flex" alignItems={"center"}>
            <IconButton sx={{ color: "white" }} onClick={handleClick}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Navigation List */}
        <List sx={{ mt: -1 }}>
        <Box
            style={{
              width: "100%",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = Colors.primaryLight;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
          <Link
            to={"/tvs"}
            style={{ color: "black", textDecoration: "none" }}
            onClick={handleClick}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "black";
            }}
          >
            <ListItem>
              <TvIcon sx={{ mr: 2 }} />
              <ListItemText>Tv's</ListItemText>
            </ListItem>
          </Link>
          </Box>
          <Divider />
          <Box
            style={{
              width: "100%",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = Colors.primaryLight;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            <Link
              to={"/computers"}
              style={{ color: "black", textDecoration: "none" }}
              onClick={handleClick}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "black";
              }}
            >
              <ListItem>
                <ComputerIcon sx={{ mr: 2 }} />
                <ListItemText>Computers</ListItemText>
              </ListItem>
            </Link>
          </Box>
          <Divider />
          <Box
            style={{
              width: "100%",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = Colors.primaryLight;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
          <Link
            to={"/cameras"}
            style={{ color: "black", textDecoration: "none" }}
            onClick={handleClick}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "black";
            }}
          >
            <ListItem>
              <CameraAltIcon sx={{ mr: 2 }} />
              <ListItemText>Cameras</ListItemText>
            </ListItem>
          </Link>
          </Box>
          <Divider />
          <Box
            style={{
              width: "100%",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = Colors.primaryLight;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
          <Link
            to={"/phones"}
            style={{ color: "black", textDecoration: "none" }}
            onClick={handleClick}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "black";
            }}
          >
            <ListItem>
              <SmartphoneIcon sx={{ mr: 2 }} />
              <ListItemText>Phones & Tablets</ListItemText>
            </ListItem>
          </Link>
          </Box>
          <Divider />
          <Box
            style={{
              width: "100%",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = Colors.primaryLight;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
          <Link
            to={"/gaming"}
            style={{ color: "black", textDecoration: "none" }}
            onClick={handleClick}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "black";
            }}
          >
            <ListItem>
              <SportsEsportsIcon sx={{ mr: 2 }} />
              <ListItemText>Gaming</ListItemText>
            </ListItem>
          </Link>
          </Box>
          <Divider />
          <Box
            style={{
              width: "100%",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = Colors.primaryLight;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
          <Link
            to={"/sound"}
            style={{ color: "black", textDecoration: "none" }}
            onClick={handleClick}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "black";
            }}
          >
            <ListItem>
              <HeadphonesIcon sx={{ mr: 2 }} />
              <ListItemText>Sound</ListItemText>
            </ListItem>
          </Link>
          </Box>
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
}
