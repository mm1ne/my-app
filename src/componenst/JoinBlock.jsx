import React from 'react';
import API from 'axios'




function JoinBlock( {onLogin} ) {



    const [roomId, setRoomId] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isLoadind, setLoading] = React.useState(false);

    

    const onEnter = async () => {
      if (!roomId || !userName) {
       return  alert("Введите комнату и никнейм")
      }
      const obj = {
        roomId,
        userName
      }
      setLoading(true);
      await API
      // Отправляем на сервер комнату и никнейм
      .post(`/rooms`, obj) 
      onLogin(obj)
      ;

      
      


    };

  return (
      <div className=" d-flex flex-column align-items-center join-block">
    
      <input type="text"
      value={roomId}
      onChange={e => setRoomId(e.target.value)}
      placeholder="Id Room" />
      <input type="text" 
      value={userName}
      onChange={e => setUserName(e.target.value)}
      placeholder="Введите ваш никнейм"/>
      <button className="btn btn-success btn-join" disabled={isLoadind} onClick={onEnter}>
        {isLoadind ? 'Вход...' : 'Войти'}
      </button>
      
      </div>
    
  );
}

export default JoinBlock;
