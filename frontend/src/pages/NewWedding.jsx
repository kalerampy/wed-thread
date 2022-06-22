import React from 'react'
import ButtonAppBar from '../components/AppBarHeader'
import '../styles/NewWeddingPage.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import { FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'

const NewWedding = () => {
  const navigate = useNavigate()
  const [value, setValue] = React.useState(new Date());
  const [newWedding, setNewWedding] = React.useState({
    name: '',
    location: '',
    date: new Date(),
    info_url: ''
  })
  const { fetchCurrentUser } = React.useContext(UserContext)
  useEffect(() => {
    fetchCurrentUser()
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newWedding)
    if (newWedding.name === '' || newWedding.location === '' || newWedding.date === '' || newWedding.info_url === '') {
      alert('Please fill out all fields')
    } else {
      fetch('http://localhost:3000/weddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(newWedding)
    })
    .then(res => res.json())
    .then(res => {
      navigate('/weddings')
      console.log(res)
    })
  }
}
  
  
  
  return (
    <div className='new-wedding-page'>
      <ButtonAppBar/>
      <div className='new-wedding-page-title'>
        <h2>Create a New Wedding</h2>
      </div>
      <div className='new-wedding-page-form'>
        <div className='new-wedding-page-form-input'>
        <TextField
  
          name='name'
          label="Wedding Name"
          value={newWedding.name}
          onChange={(e) => setNewWedding({ ...newWedding, [e.target.name]: e.target.value })}
        />
        </div>
        <div className='new-wedding-page-form-input'>
        <TextField

          name='location'
          label="Location"
          value={newWedding.location}
          onChange={(e) => setNewWedding({ ...newWedding, [e.target.name]: e.target.value })}
        />
        </div>
        <div className='new-wedding-page-form-input'>
        <TextField
 
          name='info_url'
          onChange={(e) => setNewWedding({ ...newWedding, [e.target.name]: e.target.value })}
          label="Wedding Website Link"
          value={newWedding.info_url}
        />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className='new-wedding-page-form-input'>
        <MobileDatePicker

          className='text-field date-picker'
          label="Wedding Date"
          value={newWedding.date}
          onChange={(newValue) => {
            setNewWedding({ ...newWedding, date: newValue.toISOString() });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </div>
        </LocalizationProvider>
        <div className='new-wedding-page-form-button'>
        <Button variant='outlined' onClick={handleSubmit}>Create Wedding</Button> 
        </div>
        </div>
    </div>
  )
}

export default NewWedding