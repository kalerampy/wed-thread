import React, {useEffect, useState, useContext} from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'
import { API_ROOT } from '../constants'
import { UserContext } from '../context/UserContext'

const WeddingEnrollment = () => {
  const [wedding, setWedding] = useState({})
  const { user, fetchCurrentUser, setLastLocation } = useContext(UserContext)
  const { unique_id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

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
      .then(res => res.json())
      .then(json => console.log(json))
    }
  }
  }
  
  return (
    <div>
      <h1>You've been invited to:</h1>
      <h2>{wedding.name}</h2>
      <button onClick={enrollUser}>Accept Invitation</button>
      <p>Don't have an account?</p>
      <Link to="/signup">Sign Up</Link>
    </div>
    
  )
}

export default WeddingEnrollment