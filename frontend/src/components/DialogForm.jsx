import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const FormDialog = ({ open, onClose, onSubmit, title, data }) => {

  const [formValues, setFormValues] = React.useState({});

  React.useEffect(() => {
    const initialFormValues = {};
    data.forEach(item => {
      initialFormValues[item.title.toLowerCase()] = item.value || '';
    });
    setFormValues(initialFormValues);
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
    setFormValues({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const renderFields = () => {
    return data.map((item, index) => (
      <TextField
        key={index}
        autoFocus={index === 0}
        margin="dense"
        id={`${item.title.toLowerCase()}-field`}
        label={item.label}
        type="text"
        fullWidth
        variant="standard"
        value={formValues[item.title.toLowerCase()] || ''}
        onChange={handleChange}
        name={item.title.toLowerCase()}
      />
    ));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {renderFields()}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormDialog;
