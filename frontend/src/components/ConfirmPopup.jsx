import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


const ConfirmPopup = ({ open, onClose, onSubmit }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };
  
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>No</Button>
          <Button onClick={handleSubmit}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );  
}

export default ConfirmPopup