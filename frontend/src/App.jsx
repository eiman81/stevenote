import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Deck from './pages/Deck';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [store, setStore] = useState(null);
  console.log(store);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout token={token} setTokenFn={setToken}/>}>
              <Route index element={<Navigate to="/register" />} />
              <Route path="register" element={<Register setTokenFn={setToken} />} />
              <Route path="dashboard" element={<Dashboard token={token} setStoreFn={setStore} />} />
              <Route path="deck/:deckId" element={<Deck token={token} />} />
              <Route path="login" element={<Login setTokenFn={setToken} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
