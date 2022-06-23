import React, { useEffect, useContext } from 'react'
import { TextField, Box, FormControl } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { API_ROOT, HEADERS } from '../constants';
import { UserContext } from '../context/UserContext';
import { FaPaperPlane } from "react-icons/fa";



const SendNewMessage = ({ handleSendMessage }) => {
  
  const [newMessage, setNewMessage] = React.useState('');


  const handleSend = (e) => {
    e.preventDefault()
    if (newMessage !== '') {
      handleSendMessage(newMessage);
      setNewMessage('');
    }
  }


  return (
    <div className='footer'>
      <FormControl onSubmit={handleSend}>
      <TextField
          className='message-input'
          // fullWidth
          size='small'
          margin='dense'
          maxRows={4}
          onKeyUp={(e) => {
            const ENTER = 13;
            if (e.keyCode === ENTER) {
              handleSend(e);
            }
          }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </FormControl>
      <FaPaperPlane 
      fontSize='large'
      onClick={handleSend}
      type='button'
      style={{
        width: '1.3em',
        height: '1.3em',
        marginLeft: '3vw',
        color: '#00c2cb',
      }}
      />

      
    </div>
  )
}

export default SendNewMessage