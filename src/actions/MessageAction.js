import axios from 'axios'
import {
    GET_MESSAGES,
    ADD_MESSAGE
} from '../actions/types'

export const getMessages = ({id}) => dispatch => {
    const params = {id}
    axios.get("/message", {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          },
          params
        }).then((res) => {       
          dispatch({
            type: GET_MESSAGES,
            payload: res.data  
          }) 
          /* socketRef.current.on(
            "newChatMessage",(message) => {
              setMessages(messages => [...messages, res.data]);
            }
          );  */
        }).catch((err) => {
            console.log(err);
        });
}

export const addMessage = (reqBody) => dispatch => {

    axios.post("/message", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    }).then(res => dispatch({
        type: ADD_MESSAGE,
        payload: res.data
    })).catch((err) => {
        console.log(err);
    });
}