import React from "react";
import useChat from "./_useChat";
import MessageBox from "./MessageBox";
import Messages from "./Messages";

const Chat = (props) => {
  const { sendMessage } = useChat(props.doc); 

  return (
    <div>
      <Messages doc={props.doc} messages={props.messages} />
      <MessageBox
        doc={props.doc}
        onSendMessage={message => {
          sendMessage( message );
        }}
      />
    </div>
  );
};

export default Chat;
