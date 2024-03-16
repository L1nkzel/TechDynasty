import { Button, DialogActions, IconButton, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AlertBox({
  open,
  setOpen,
  text,
  deleteHandler,
  id,
}: {
  open: boolean;
  setOpen: any;
  text: String;
  deleteHandler?: any;
  id?: String;
}) {
  const location = useLocation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {userInfo &&
        userInfo.isAdmin &&
        (location.pathname === "/admin/products" || location.pathname === "/admin/users") && (
          <Tooltip title="Delete">
            <IconButton onClick={() => setOpen(true)}>
              <DeleteOutlineIcon
                sx={{ fontSize: { xxs: 14, xs: 16, sm: 18 }, color: "crimson" }}
              />
            </IconButton>
          </Tooltip>
        )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        PaperProps={{
          elevation: 1,
          sx: {
            border: "solid 1px gray"
          }
        }}
        slotProps={{
          backdrop: { sx: { backgroundColor: "rgba(0, 0, 10, 0.1)" } },
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
          {userInfo &&
            userInfo.isAdmin &&
            (location.pathname === "/admin/products" || location.pathname === "/admin/users") && (
              <DialogActions>
                <Button onClick={() => id && deleteHandler(id)}>
                  Yes
                </Button>
                <Button onClick={handleClose}>No</Button>
              </DialogActions>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}