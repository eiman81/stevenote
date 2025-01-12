import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const Logout = (props) => {

  const navigate = useNavigate();

  const logout = () => {
    axios.post('http://localhost:5005/admin/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
      .then((response) => {
        localStorage.removeItem('token');
        props.setTokenFn(null);
        navigate('/login');
        console.log(response);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }

  return (
    <Button onClick={logout}>Logout</Button>
  )
}

export default Logout