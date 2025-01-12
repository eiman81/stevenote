import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import NewTextModal from './NewTextModal';
import EditTextModal from './EditTextModal';


const ElementModal = ({ formType, onClose, open, onSubmit, textProperties, setTextProperties }) => {
  const [formValues, setFormValues] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
    setFormValues({});
  };

  const getElement = () => {
    switch (formType) {
    case 'edit': return <EditTextModal textProperties={textProperties} setTextProperties={setTextProperties} />
    case 'add': return <NewTextModal textProperties={textProperties} setTextProperties={setTextProperties} />
    }
  }


  return (
    <>
      <Dialog open={open} onClose={onClose}>
        {getElement()}
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ElementModal