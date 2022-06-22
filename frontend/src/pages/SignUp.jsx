import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaRegUserCircle } from "react-icons/fa";
import '../styles/Login.css';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {/* {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

const theme = createTheme();


export default function SignUp() {
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: ''
  })
  const [errors, setErrors] = useState(null)

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

const fetchSignUp = () => {
  fetch("http://localhost:3000/signup", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: formInfo
  })
})
  .then((res) => {
    if (res.ok) {
      console.log(res.headers.get("Authorization"));
      localStorage.setItem("token", res.headers.get("Authorization"));
      navigate('/weddings')
      return res.json();
    } else {
      res.json().then(errors => {
        console.log(errors.status.message)
        setErrors(errors.status.message)
      })
    }
  })
  .then((json) => console.dir(json))
  .catch((err) => console.log(err));
}
  


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(formInfo);
    fetchSignUp()

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
            Sign up
          </Typography>
          <Typography component="p" variant="p" style={{color: 'red'}}>
            {errors}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formInfo.first_name}
                  onChange={(e) => setFormInfo({ ...formInfo, first_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formInfo.last_name}
                  onChange={(e) => setFormInfo({ ...formInfo, last_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formInfo.email}
                  onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formInfo.password}
                  onChange={(e) => setFormInfo({ ...formInfo, password: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Password Confirmation"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                  value={formInfo.password_confirmation}
                  onChange={(e) => setFormInfo({ ...formInfo, password_confirmation: e.target.value })}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}