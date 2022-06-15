import React, {useContext, useEffect, useState} from 'react'
import '../styles/Weddings.css'
import { UserContext } from '../context/UserContext'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppBarHeader from '../components/AppBarHeader'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Weddings = ( {user} ) => {

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [weddingValue, setWeddingValue] = useState('')
  const { setUser, weddingState, setWeddingState, fetchCurrentUser } = useContext(UserContext)
  const [weddingData, setWeddingData] = useState([])
  const navigate = useNavigate()

  useEffect (() => {
    fetchWeddings()
    fetchCurrentUser()
  }, [])



  const fetchWeddings = () => {
    fetch(`http://localhost:3000/weddings`, {
      method: "get",
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setWeddingData(data)})
    .catch(err => console.error(err))
  }

  const ifWedding = () => {
    return <>
    <h2>Please Select a Wedding</h2>
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-name-label">Wedding Name</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        input={<OutlinedInput label="Wedding Name" />}
        MenuProps={MenuProps}
        value={weddingValue}
        onChange={(e) => {
          setWeddingValue(e.target.value)
          setWeddingState(e.target.value)
          localStorage.setItem("current_wedding", JSON.stringify(e.target.value))
          navigate('/threads')
        }}
      >
        {weddingData.map((wedding) => (
        <MenuItem
            key={wedding.id}
            value={wedding}
            style={getStyles(wedding.name, personName, theme)}
          >
            {wedding.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </>
  }

  return (
    <div className='wedding-page'>
      <AppBarHeader/>
      {weddingData.length > 0 ? ifWedding() : <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>}
    </div>
  )
}

export default Weddings
