import React, { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'


const Home = ({}) => {
  const navigate = useNavigate()

  
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