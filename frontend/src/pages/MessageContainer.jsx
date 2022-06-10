import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' 
import { UserContext } from '../context/UserContext'
 
function MessageContainer() {
  const params = useParams()
  const { weddingState, setWeddingState, user, setUser } = useContext(UserContext)

  const [messages, setMessages] = useState([])
  const [thread, setThread] = useState({})

  useEffect (() => {
    const weddingStorage = JSON.parse(localStorage.getItem('current_wedding'))
    const userStorage = JSON.parse(localStorage.getItem('current_user'))
    setWeddingState(weddingStorage)
    setUser(userStorage)
    const messageThread = weddingStorage.message_threads.filter(thread => {
      if (thread.id === parseInt(params.id)) {
        return thread
      }
    })
    setMessages(messageThread[0].messages)
    setThread(messageThread[0])
  }, [])





useEffect(() => {
  function openConnection() {
    return new WebSocket(`ws://localhost:3000/cable`)
  }
  const chatWebSocket = openConnection()
  chatWebSocket.onopen = (event) => {
    const subscribeMsg = {'command': 'subscribe', 'identifier': "{\'channel\':\'message_thread_channel\', 'message_thread_id': message_thread.id}"}
  }
  chatWebSocket.send(JSON.stringify(subscribeMsg))
}, [])






  const displayMessages = messages.map(message => {
    return <p>{message.body}</p>
  })


  return (
    <div>
      {displayMessages}
    </div>
  )
}

export default MessageContainer