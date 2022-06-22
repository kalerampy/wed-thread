import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBarHeader from '../components/AppBarHeader';
import '../styles/GuestList.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom';


function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));





const GuestList = () => {
  
  const { weddingState, fetchCurrentUser, fetchWeddingState, setWeddingState } = useContext(UserContext);
  const [guests, setGuests] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!weddingState) {
      navigate('/weddings')
    } else {
      fetch('http://localhost:3000/wedding_guests/' + weddingState.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(res => {
        setGuests(res)
      })
    }
    fetchCurrentUser()
    console.log(weddingState)
      

    }, [])

    const removeGuest = (id) => {
      fetch('http://localhost:3000/permissions/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setGuests(guests.filter(guest => guest.id !== id))
      })
    }

  return (
    <div className='guest-list-page'>
      <AppBarHeader/>
    <h2>Guest List</h2>
      <Grid>
          <Demo>
            <List>
            {guests.map((guest) => {
              return (
                <div className='list-item'>
                  <ListItem
                      key={guest.id}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => removeGuest(guest.id)}>
                          <RemoveCircleOutlineIcon/>
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <AccountCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={guest.first_name + " " + guest.last_name}
                      />
                    </ListItem>
              </div>)
            })}
            </List>
          </Demo>
        </Grid>
    </div>
  )
}

export default GuestList