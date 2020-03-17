
import React from "react";
import { useSelector } from 'react-redux'
import { List, Container } from 'semantic-ui-react'


const Messages = ( props) => {    

const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  return (
   
    <Container>
    <List divided relaxed style={{height:458, margin:5, overflowY:'auto'}}>
    { 
    props.messages.map((message)=>
    oauth2IsAuthenticated && message.sender === oauth2Users.name ?
    <List.Item key={message._id} >
      <List.Icon name='user circle' size='large' verticalAlign='middle' inverted/>
      <List.Content>
        <List.Header>{message.sender}</List.Header>
        <List.Description>{message.content}</List.Description>
      </List.Content>
    </List.Item>
    : 
    <List.Item key={message._id} >
      <List.Icon name='user circle' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header>{message.sender}</List.Header>
        <List.Description>{message.content}</List.Description>
      </List.Content>
    </List.Item>
    )
  }
    </List>
    </Container>
  );
};

export default Messages;
