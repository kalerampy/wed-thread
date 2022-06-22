import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HambergerMenu  from '../components/HambergerMenu.jsx';
import { lightBlue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function ButtonAppBar() {
  
  const navigate = useNavigate();
  const { user, setUser, logout } = useContext(UserContext);
  
  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
  method: "delete",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
})
  .then((res) => {
    if (res.ok) {
      
      return res.json();
    } else {
      return res.json().then((json) => Promise.reject(json));
    }
  })
  .then((json) => {
    // console.dir(json);
    logout()
  })
  .catch((err) => console.error(err));
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" color='info'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HambergerMenu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello, {user ? user.first_name: null}
          </Typography>
          {user ? <Button color="inherit" variant='outlined' onClick={handleLogout}>Logout</Button> 
          : <Button color="inherit" onClick={() => navigate('/login') }>Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
