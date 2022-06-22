import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate, Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaRegUserCircle } from "react-icons/fa";
import '../styles/Login.css';
import wedThreadImage from '../images/wedThreadImage.png';
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#c4c4c4"
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#3f3f3f"
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#00c2cb"
  },
  [`& .${outlinedInputClasses.input}`]: {
    color: "#c4c4c4"
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "#3f3f3f"
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
    color: "#00c2cb"
  },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "#c4c4c4"
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "#3f3f3f"
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "#00c2cb"
  }
});


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://wed-thread.com/">
        Wed Thread
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  // if (!props.user) {
  //   return <Navigate to="/landing" replace />;
  // }
  
  const location = useLocation();
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState()
  
  const { user, setUser} = useContext(UserContext);

  const fetchLogin = () => {
    fetch("http://localhost:3000/login", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: formInfo
  }),
})
  .then((res) => {
    if (res.ok) {
      // console.log(res.headers.get("Authorization"));
      localStorage.setItem("token", res.headers.get("Authorization"));
      
      return res.json();
    } else {
      return res.text().then((text) => Promise.reject(text));
    }
  })
  .then((json) => {
    console.log(json)
    setUser(json.user)
    localStorage.setItem("current_user", JSON.stringify(json.user));

    const lastLocation = JSON.parse(localStorage.getItem("last_location"));
    if (lastLocation.location) {
      localStorage.setItem("last_location", false);
      navigate(lastLocation.location);
    } else {
      navigate('/weddings');
    }

  })
  .catch((err) => {
    setErrors(err)
  });
  }
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetchLogin();
  };

  return (
    <div className='login-page'>
      <div className='login-image'>
      </div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00c2cb' }}>
            <FaRegUserCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Typography component="p" variant="p" style={{color: 'red'}}>
            {errors}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
              value={formInfo.email}
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setFormInfo({ ...formInfo, password: e.target.value })}
              value={formInfo.password}
            />
          
            <Button
              type="submit"
              fullWidth
              variant="outlined"
    
              sx={{ marginTop: 1, 
                marginBottom: 1,
                color: '#00c2cb', 
                borderColor: '#00c2cb', 
                '&:hover': {
                backgroundColor: '#00c2cb',
                color: 'white',
                borderColor: '#00c2cb'} 
                }}
            >
              Sign In
            </Button>
            <Grid container direction='column' alignItems='center'>
              <Grid item>
                <Link style={{textDecoration: 'none', color: '#b2b2b2', '&:hover': {
            color: 'black'}}} 
            to='/signup'>Don't have an account? Sign Up</Link>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}