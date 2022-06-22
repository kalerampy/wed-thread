import React, { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
import '../styles/HomePage.css'
import wedThreadImage from '../images/wedThreadImage.png'



const Home = ({}) => {
  const navigate = useNavigate()

  
  return (
    <div className='home-page'>
      <header className='home-page-header'>
        
      </header>
      <div className='text-over-image'>
        <div className='home-image'>
          <img src={wedThreadImage} alt=''/>
          <div className='main-text'>
            <h2>Guest communication made easy!</h2> 
          </div>
          {/* <img src={rings}  alt="rings" /> */}
          <div className='home-buttons'>
            <Button sx={{ margin: 1, 
            color: 'white', 
            borderColor: 'white', 
            '&:hover': {
            backgroundColor: '#00c2cb',
            color: 'white',
            borderColor: '#00c2cb'} 
            }} variant='outlined' onClick={() => navigate('/login')}>Login</Button>
            <Button sx={{ margin: 1, 
            color: 'white', 
            borderColor: 'white', 
            '&:hover': {
            backgroundColor: '#00c2cb',
            color: 'white',
            borderColor: '#00c2cb'} 
            }} variant='outlined' onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home