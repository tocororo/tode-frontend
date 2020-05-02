import { Form, TextArea } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import React, { useState } from "react";
import { updateMessageState} from '../../../actions/MessageAction'

const MessageBox = ({ onSendMessage: pushSendMessage, doc:document }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const chatChecked = () => {
    dispatch(updateMessageState({document}))
  }

  return (
    <Form>
      <TextArea
        placeholder='Message' 
        onClick={chatChecked}
        onChange={evt => setMessage(evt.target.value)}
        onKeyDown={evt => {
          if (evt.key === "Enter") {
            evt.preventDefault();
            pushSendMessage(message);
            setMessage("");
          }
        }}
        rows="4"
        value={message}
      />
    </Form>
  );
};

export default MessageBox;
