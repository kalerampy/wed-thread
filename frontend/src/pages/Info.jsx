import React from 'react'
import ButtonAppBar from '../components/AppBarHeader'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext';

const Info = () => {
  
  const { weddingState } = useContext(UserContext);

  useEffect(() => {
    if (weddingState) {
    fetch('http://localhost:3000/wedding_info/' + weddingState.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(res => {

      console.log(res)
    })}
  }, [])
  
  
  
  
  
  return (
    <div>
    <ButtonAppBar/>
    <h2>Wedding Info</h2>

    </div>
  )
}

export default Info