import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Container } from '@mui/material';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const register = () => {
    console.log(email, password, name);
    axios.post('http://localhost:5005/admin/auth/register', {
      email: email,
      password: password,
      name: name
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        console.log(response);
        props.setTokenFn(response.data.token);
        navigate('/dashboard');
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }
  
  return (
    <>
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="90vh"
          sx={{
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="John@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Name"
            type="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={register}
          >
            Register
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default Register
