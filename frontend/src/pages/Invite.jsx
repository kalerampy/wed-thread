import React from 'react'
import ButtonAppBar from '../components/AppBarHeader'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'



const Invite = () => {
  const { weddingState, setWeddingState } = useContext(UserContext)

  useEffect(() => {
    const wedding = JSON.parse(localStorage.getItem('current_wedding'))
    setWeddingState(wedding)
  }, [])

  const link = `http://localhost:4000/invite/`
  return (
    <div>
      <ButtonAppBar/>
      <h1>Invite</h1>
      <p>Invite your friends to join your wedding!</p>
      <button onClick={() => {navigator.clipboard.writeText(`${link}${weddingState.unique_id}`)}}>Copy Link</button>
      {weddingState ? <Link to={`${weddingState.unique_id}`}>Copy Link</Link> : null}
    </div>
  )
}

export default Invite