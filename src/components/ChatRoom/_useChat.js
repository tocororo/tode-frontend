import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import {getMessages} from '../../actions/MessageAction'


const useChat = (doc) => { 
  const socketRef = useRef();
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)      
  const dispatch = useDispatch()

  useEffect( () => {        
    
    socketRef.current = socketIOClient(
      "https://192.168.1.103:4000"
    );
    
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  
  const sendMessage = (message) => {
    if (oauth2Users) {      
      let reqBody = {
          sender: oauth2Users.name,
          content: message,
          document: doc
      }

      fetch("/message", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBody)
      }).then((res) => {
          return res.json();
      }).then((resJson) => {
        socketRef.current.emit("newChatMessage", resJson);
      }).catch((err) => {
          console.log(err);
      });
    }    

    dispatch(getMessages({doc}))
}

  return { sendMessage };
};

export default useChat;
