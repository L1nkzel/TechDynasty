import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function AlertBox({
    open,
    setOpen,
    text
}: {
    open: boolean;
    setOpen: any;
    text: String
}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {text}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}