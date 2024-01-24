import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

export function MyDrawer() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <IconButton style={{ color: "white" }} onClick={handleClick}>
        <MenuIcon sx={{ fontSize: { xxs: 22, xs: 28, sm: 32 }}}/>
      </IconButton>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        PaperProps={{
          style: { minWidth: 250 },
        }}
      >
        <Box display="flex" justifyContent={"space-between"}>
          <DialogTitle>Category</DialogTitle>
          <IconButton onClick={handleClick}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <Link to={"/tvs"} style={{ color: "black" }} onClick={handleClick}>
            <ListItem>
              <ListItemText>Tv's</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={"/computers"}
            style={{ color: "black" }}
            onClick={handleClick}
          >
            <ListItem>
              <ListItemText>Computers</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={"/cameras"}
            style={{ color: "black" }}
            onClick={handleClick}
          >
            <ListItem>
              <ListItemText>Cameras</ListItemText>
            </ListItem>
          </Link>
          <Link to={"/phones"} style={{ color: "black" }} onClick={handleClick}>
            <ListItem>
              <ListItemText>Phones & Tablets</ListItemText>
            </ListItem>
          </Link>
          <Link to={"/gaming"} style={{ color: "black" }} onClick={handleClick}>
            <ListItem>
              <ListItemText>Gaming</ListItemText>
            </ListItem>
          </Link>
          <Link to={"/sound"} style={{ color: "black" }} onClick={handleClick}>
            <ListItem>
              <ListItemText>Sound</ListItemText>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </Box>
  );
}
