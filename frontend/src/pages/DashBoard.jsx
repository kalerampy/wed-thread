import { AppBar } from '@mui/material'
import React, { useEffect, useContext } from 'react'
import AppBarHeader from '../components/AppBarHeader.jsx'
import { UserContext } from '../context/UserContext'
import { Routes, Route} from 'react-router-dom'
import Weddings from './Weddings.jsx'


const DashBoard = () => {
  const {user, setUser, fetchCurrentUser} = useContext(UserContext)
  useEffect (() => {
    fetchCurrentUser()
  }, [])
  
  return (
    <div>
      <AppBarHeader/>
    </div>
  )
}

export default DashBoard