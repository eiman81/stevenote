import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Logout from '../components/Logout'
import Button from '@mui/material/Button';
import { AppBar, Toolbar } from '@mui/material';


const Layout = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (props.token && ['/login', '/register'].includes(location.pathname)) {
      navigate('/dashboard');
    }
    if (!props.token && !['/login', '/register'].includes(location.pathname)) {
      navigate('/login');
    }
  }, [props.token, location.pathname]);

  return (
    <>
      <AppBar >
        <Toolbar variant='dense' sx={{ justifyContent: 'flex-end' }}>
          {props.token ? (
            <>
              <Button component={Link} to="/dashboard">Dashboard</Button>
              <Logout setTokenFn={props.setTokenFn} token={props.token}/>
            </>
          ) : (
            <>
              <Button component={Link} to="/login">Login</Button>
              <Button component={Link} to="/register">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '50px' }}>
      </div>
      <Outlet />
    </>
  )
}

export default Layout