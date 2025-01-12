import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const FormDialog = ({ open, onClose, onSubmit }) => {

  const [deckTitle, setDeckTitle] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(deckTitle);
    setDeckTitle('');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create New Deck</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Enter a title for your new deck.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="deck-title"
            label="Deck Title"
            type="text"
            fullWidth
            variant="standard"
            value={deckTitle}
            onChange={(event) => setDeckTitle(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );  
}

export default FormDialog