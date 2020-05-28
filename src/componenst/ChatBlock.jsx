import React from 'react';
import socket from '../socket'

function Chat({users , messages, userName, roomId, addNewMessage}) {

    const [messageValue, setMessageValue] = React.useState('');
    const messagesRef = React.useRef(null);


    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text : messageValue
        })
        addNewMessage({
            userName,
            text: messageValue
        })
        setMessageValue('')
    };

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages])
    
    
  return (
      
          
        <div className="">
            <div className="row m-5 shadow-lg ">
            <div className="users_block col-2 border">
  <p>Room : <b>{roomId}</b></p>
    <hr />
  <p>User: <b> {users.length} </b> </p>
            <ul>
                {users.map((name) => (
                    <li><b>{name}</b></li>
                ))}
            </ul>

            </div>
            <div className="chat-messages border col-10">

            <div ref={messagesRef} className="messages d-flex flex-column ">
                {
                
                    messages.map((message) => {
                        if (messages.userName === userName) {
                            return (
                            <div className="message mt-2 my-message">
                            <p>{message.text}</p>
                            <div>
                            <span>{message.userName}</span>
                            </div>
                            </div>
                        )
                        }
                        else {
                            return (
                                <div className="message mt-2 another-message">
                                    
                            <p>{message.text}</p>
                            <div>
                            <span><b>{message.userName}</b></span>
                            </div>
                            
                        
                        </div>
        
                            )
                        }
                
            
                    })
                }
            </div>
            <div className="send_messages row justify-content-center m-3 ">
                <hr />
                <textarea 
                autoFocus
                
                className="col-7"
                value = {messageValue}
                onChange = {e => setMessageValue(e.target.value)}
                rows="3"
                />
                <button type="button" className="ml-5 btn btn-success btn-cend" onClick={() => onSendMessage()}>SEND</button>
            </div>

            </div>
        </div>
        </div>

  );
}

export default Chat;
