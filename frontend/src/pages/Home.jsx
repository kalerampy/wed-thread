import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Home = () => {
  const navigate = useNavigate()

  const { user } = useContext(UserContext)
  
  
  return (
    <div>
      Home Page
      <h1>Wed Thread</h1>
      <h3>Better wedding communication for all</h3> 
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  )
}

export default Home