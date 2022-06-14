import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ message_threads, handleReceivedMessage }) => {
  return (
    <Fragment>
      {message_threads.map(message_thread => {
        return (
          <ActionCable
            key={message_thread.id}  
            channel={{ channel: 'MessagesChannel', message_thread: message_thread.id }}
            onReceived={handleReceivedMessage}
          />
          
        );
      })}
    </Fragment>
  );
};

export default Cable;