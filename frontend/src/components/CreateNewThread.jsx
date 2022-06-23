import React, { useEffect, useContext } from 'react'
import { TextField, Box, FormControl } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { API_ROOT, HEADERS } from '../constants';
import { UserContext } from '../context/UserContext';
import AddCommentSharpIcon from '@mui/icons-material/AddCommentSharp';
import { FaPaperPlane } from "react-icons/fa";


const CreateNewThread = ({ handleSendThread }) => {
  
  const [newThread, setNewThread] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleSend = (e) => {
    e.preventDefault()
    setIsDisabled(false)
    
    if (newThread !== '') {
      handleSendThread(newThread);
      setNewThread('');
    }
  }


  return (
    <div className='footer'>
      {isDisabled ? <FormControl onSubmit={handleSend}>
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
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
        />
      </FormControl> : <AddCommentSharpIcon
      className='add-button'
      type='button'
      onClick={() => setIsDisabled(true)}
      style={{
        width: '1.3em',
        height: '1.3em',
        marginLeft: '10px',
        color: '#00c2cb',
      }}
      /> }
     {isDisabled ? <FaPaperPlane
      className='send-button'
      fontSize='large'
      onClick={handleSend}
      type='button'
      style={{
        width: '1.3em',
        height: '1.3em',
        marginLeft: '3vw',
        color: '#00c2cb',
      }}
      />: null}

      
    </div>
  )
}

export default CreateNewThread