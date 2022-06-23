import React, {useEffect, useState, useContext} from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import { API_ROOT } from '../constants'
import { UserContext } from '../context/UserContext'
import { Button } from '@mui/material'
import '../styles/WeddingEnrollment.css'

const WeddingEnrollment = () => {
  const [wedding, setWedding] = useState({})
  const { user, fetchCurrentUser, setLastLocation } = useContext(UserContext)
  const { unique_id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCurrentUser()
    fetch(API_ROOT + '/invite_link/' + unique_id)
    .then(res => res.json())
    .then(data => {
      setWedding(data)
      console.log(data)})
  }, [])
  
  const enrollUser = () => {
    if (user == null) {
      localStorage.setItem('last_location', JSON.stringify({location: location.pathname}))
      navigate('/login')
    } else {
    console.log(user)
    const userObject = {
      user_id: user.id,
      wedding_id: wedding.id
    }

    if (user) {
      fetch(API_ROOT + '/invite_link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(userObject)
      })
      .then(res => {
        if (res.ok) {
          navigate('/weddings')
        } else {
          console.log('error')
          setError('You are already enrolled in this wedding')
        }
      })
    }
  }
  }
  
  return (
    <div className='wedding-enrollment'>
      <h1>You've been invited to:</h1>
      <h3>{wedding.name}</h3>
      <Button variant='contained' onClick={enrollUser}>Accept Invitation</Button>
      <p>Don't have an account?</p>
      <Link style={{color: 'white'}} to="/signup">Sign Up</Link>
      {error && <h3 style={{color: 'red'}}>{error}</h3>}
    </div>
    
  )
}

export default WeddingEnrollment