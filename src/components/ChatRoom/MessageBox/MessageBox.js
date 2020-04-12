import { Form, TextArea } from 'semantic-ui-react'
import React, { useState } from "react";

const MessageBox = ({ onSendMessage: pushSendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <Form>
      <TextArea
        placeholder='Message' 
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
