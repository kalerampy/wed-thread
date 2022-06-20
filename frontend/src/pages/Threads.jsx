import React, {useEffect, useContext, ErrorBoundary} from 'react'
import { API_ROOT } from '../constants/index.js'
import AppBarHeader from '../components/AppBarHeader.jsx'
import '../styles/Threads.css'
import {UserContext} from '../context/UserContext'
import { useNavigate, Navigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import CreateNewThread from '../components/CreateNewThread.jsx'




const Threads = () => {
  const navigate = useNavigate()
  const [weddingThreads, setWeddingThreads] = React.useState([])
  const {fetchCurrentUser, weddingState, setWeddingState} = useContext(UserContext)
  
  useEffect (() => {
    fetchCurrentUser()
    if (weddingState?.id){
    fetch(API_ROOT + '/wedding_threads/' + weddingState.id)
    .then(res => res.json())
    .then(data => {
      setWeddingThreads(data)
    })
  }
  }, [])

  const currentWedding = localStorage.getItem('current_wedding')

  useEffect (() => {
    setWeddingState(JSON.parse(currentWedding))
  }, [])


  const handleSendThread = (newThread) => {
    console.log(newThread)
    fetch(API_ROOT + `/message_threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        wedding_id: weddingState.id,
        title: newThread
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setWeddingThreads([...weddingThreads, json])
        setWeddingState({...weddingState, message_threads: [...weddingThreads, json]})
   
      })
    
  }



  return (
    <div className='threads-page'>
      <AppBarHeader/>
      {!weddingState ? null : <h2 className='title'>{weddingState.name}</h2>}
      <div className='threads-container'>
            {!weddingState ? <Navigate to="/weddings" replace /> :    <List sx={{ 
              width: '100%', 
              maxWidth: 360, 
              bgcolor: 'background.paper',
              
              }}>
                  
            {weddingThreads.map((thread) => (
              <ListItem className='thread-list-item'
              onClick={() => navigate(`/threads/${thread.id}/messages`)}
              key={thread.id}
              // disableGutters
              secondaryAction={
                
                    <CommentIcon />
                  
                }
                >
                <ListItemText primary={`${thread.title}`} />
              </ListItem>
            ))}
          </List>}
      </div>
    <CreateNewThread handleSendThread={handleSendThread}/>
    </div>
  )
}

export default Threads
