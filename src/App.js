import React from 'react';
import socket from './socket'
import './App.css';
import axios from 'axios'
import reducer from './reducer'
import JoinBlock from './componenst/JoinBlock'
import Chat from './componenst/ChatBlock'



function App() {

  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  })

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN' , obj)
   const { data } = await axios.get(`/rooms/${obj.roomId}`);
   dispatch({
     type: 'SET_DATA',
     payload: data
   })

  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload : users
    })

  }

  const addNewMessage = (message) => {
    dispatch({
      type : 'SET_MESSAGE',
      payload: message
    })
  }

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE' , addNewMessage);

    
  } , []);



  

  

  return (
    <div className="container-fluid">
      
     {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} addNewMessage={addNewMessage}/>}
     
    </div>
  );
}

export default App;
