import React, { useContext, useEffect, useState, useRef } from 'react'
import '../styles/MessageContainer.css'
import { useParams } from 'react-router-dom' 
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import AppBarHeader from '../components/AppBarHeader'
import { API_ROOT, API_WS_ROOT, HEADERS } from '../constants/index'
import SendNewMessage from '../components/SendNewMessage'
import { createConsumer } from '@rails/actioncable'
import { dividerClasses } from '@mui/material'

 
function MessageContainer() {
  const { fetchCurrentUser, user } = useContext(UserContext)
  const [thread, setThread] = useState({})
  const [messages, setMessages] = useState([])
  const [update, setUpdate] = useState(false)
  const { id } = useParams()
  



  const handleSendMessage = (newMessage) => {
    //console.log(newMessage)

    fetch(API_ROOT + `/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ 
        message_thread_id: id,
        body: newMessage,
        user_id: user.id
    }),
    })
    .then(res => res.json())
    .then(res => {
      setUpdate(!update)
    })
    .catch(err => console.log(err))
  }


  
  useEffect(() => {
    fetchCurrentUser()
    fetch(API_ROOT + `/message_threads/${id}`)
    .then(response => response.json())
    .then(data => { 
      setThread(data)})
  }, [])

  const cable = useRef()

  useEffect(() => {

    //const cable = createConsumer(API_WS_ROOT)

    if (!cable.current) {
      cable.current = createConsumer(API_WS_ROOT)
    }
    const paramsToSend = {
      channel: 'MessagesChannel',
      id: id
    }

    const handlers = {
      received(data) {
        console.log(data)
        setMessages(data.messages.reverse())
      },

      connected() {
        console.log('connected')
      },

      disconnected() {
        console.log('disconnected')
        cable.current = null
      }
    }

    const subscription = cable.current.subscriptions.create(paramsToSend, handlers)

    return function cleanup() {
      console.log('unsubscribing from: ', id)
      cable.current = null
      subscription.unsubscribe()
    }

  }, [update])

  

  const displayMessage = messages.map(message => {
    
    const setRight = () => {

     if (message.user_id == user.id) {
      return 'right'
      }
    }

    return (
      <div key={message.id} className={setRight()} >
      <div className={message.user_id == user.id ? 'message-blue' : 'message'} > 
        <p className='message-text'>{message.body}</p>
      </div>
        <div className={setRight()}>
        <p className='small'>{message.user.first_name} {message.user.last_name}</p>
        <p className='small'>{new Date(message.created_at).toLocaleTimeString()} {new Date(message.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    )
  })

  
  return (
    <div className='messages-page'>
      <AppBarHeader/>
      <h2>{thread.title}</h2>
      <div className='messages-container'>
        {displayMessage}
      </div>  
      <SendNewMessage handleSendMessage={handleSendMessage}/>
    </div>
  )
}

export default MessageContainer