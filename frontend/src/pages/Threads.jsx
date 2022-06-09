import React, {useEffect, useContext, ErrorBoundary} from 'react'
import AppBarHeader from '../components/AppBarHeader.jsx'
import '../styles/Threads.css'
import {UserContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';




const Threads = () => {
  const navigate = useNavigate()
  
  const {fetchCurrentUser, weddingState, setWeddingState} = useContext(UserContext)
  
  useEffect (() => {
    fetchCurrentUser()
  }, [])

  const currentWedding = localStorage.getItem('current_wedding')

  useEffect (() => {
    setWeddingState(JSON.parse(currentWedding))
  }, [])


const isNotLoaded = Object.keys(weddingState).length === 0

  return (
    <div className='threads-page'>
      <AppBarHeader/>
      <h2>{weddingState.name}</h2>
      {isNotLoaded ? <Spinner/> :    <List sx={{ 
        width: '100%', 
        maxWidth: 360, 
        bgcolor: 'background.paper',
        
        }}>
      {weddingState.message_threads.map((thread) => (
        <ListItem className='thread-list-item'
          onClick={() => navigate(`/threads/${thread.id}/messages`)}
          key={thread.id}
          // disableGutters
          secondaryAction={
            <IconButton aria-label="comment" >
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`${thread.title}`} />
        </ListItem>
      ))}
    </List>}
    
    </div>
  )
}

export default Threads
