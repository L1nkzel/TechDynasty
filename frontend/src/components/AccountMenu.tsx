import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import { MenuList, Typography } from "@mui/material";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountMenu({
  anchorEl,
  handleClose,
  handleLogout,
  openAnchor,
}: any) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const isBigScreen = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const { userInfo } = useSelector((state: RootState) => state.auth);

  // close the menu if screen is changed from small to big or vice versa
  useEffect(() => {
    if (isSmallScreen || isBigScreen) {
      handleClose();
    }
  }, [isSmallScreen, isBigScreen]);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!userInfo.isAdmin) {
      navigate("/profile/orders");
    } else {
      navigate("/admin/orders");
    }
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openAnchor}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
              width: 200,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuList>
          <MenuItem onClick={handleProfileClick}>
            {!userInfo.isAdmin ? (
              <ListItemIcon sx={{ display: "flex", alignItems: "center" }}>
                <PersonIcon fontSize="small" />
                <Typography ml={1}>Profile</Typography>
              </ListItemIcon>
            ) : (
              <ListItemIcon sx={{ display: "flex", alignItems: "center" }}>
                <DashboardIcon fontSize="small" />
                <Typography ml={1}>DashBoard</Typography>
              </ListItemIcon>
            )}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ display: "flex", alignItems: "center" }}>
              <Logout fontSize="small" />
              <Typography ml={1}>Logout</Typography>
            </ListItemIcon>
          
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
