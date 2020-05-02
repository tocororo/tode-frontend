import axios from 'axios'
import {
    GET_MESSAGES,
    ADD_MESSAGE,
    GET_CHAT_NUMBER
} from '../actions/types'
import {
  tokenConfig
} from './OAuth2Action'

export const getMessages = ({doc}) => dispatch => {
    const params = {doc}
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

export const updateMessageState = ({document}) => (dispatch, getSate) => {
  axios.get(`/get_updateMessageState/${document}`, tokenConfig(getSate))

  dispatch(getChatNumber());
  dispatch(getMessages({document}));
}

export const getChatNumber = () => (dispatch, getSate) => {
    axios.get(`/chatNumber`, tokenConfig(getSate)).then(res => dispatch({
            type: GET_CHAT_NUMBER,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err);
        });
};