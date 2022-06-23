import React from 'react'
import ButtonAppBar from '../components/AppBarHeader'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import '../styles/Invite.css'



const Invite = () => {
  const { weddingState, setWeddingState, fetchCurrentUser } = useContext(UserContext)

  useEffect(() => {
    fetchCurrentUser()
    const wedding = JSON.parse(localStorage.getItem('current_wedding'))
    setWeddingState(wedding)
  }, [setWeddingState])

  const link = `http://localhost:4000/invite/`
  return (
    <div>
      <ButtonAppBar/>
      <div className='invite-page'>
      <h2>Invite Guests</h2>
      <br />
      <Button variant='outlined'  onClick={() => {navigator.clipboard.writeText(`${link}${weddingState.unique_id}`)}}>Copy Link</Button>
      <br/>
      <p>*Note, anyone with this link can accept an invitation to your wedding</p>
      </div>
    </div>
  )
}

export default Invite