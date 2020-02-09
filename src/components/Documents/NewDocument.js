import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory,} from 'react-router-dom';
import { newDocument } from '../../actions/DocumentAction'
import { Container, Button, Form, Input, Segment, Label, Divider } from 'semantic-ui-react';
import styled from 'styled-components'

import Dropzone from './Dropzone'

const MyButton = styled(Button)`
&&&{
    background-color:#1d314d;
    color:white;
}

&&&:hover{
  background-color:#0f1d31;
  color:whitesmoke;
}
`

function NewDocument (props) {
  const history = useHistory();
  
  
  const [name, setName] = useState('')
  const [coment, setComent] = useState('Original')
  const [document_user, setDocument_user] = useState()
  

  /* utilizando variables de los reducers.js */
  const user = useSelector(state => state.auth.user); 
  useEffect(()=>
  user ?
  console.log(user) : null
  ,[])

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()
  const OnChangename = (e) => {
  setName(e.target.value );
  };

  const OnChangecoment = (e) => {
    setComent( e.target.value );
    if(user)
    setDocument_user(user._id)
    };
    
  const OnSubmit = (e) => {
    e.preventDefault();

    const newDoc = { name, coment, document_user };
    dispatch(newDocument(newDoc,history, name));  

  }
    return (
      <Container>
        <Segment color='blue' padded='very'><h2>Añadir Documento: Paso 1</h2>
          <Form onSubmit={OnSubmit}>
              <Form.Field>
                  <Input
                      type="text"
                      placeholder="Nombre del documento"
                      name="name"
                      onChange={OnChangename}
                      value={name}
                      required                     
                  />
                  <br/>
                  <Input
                      type="text"
                      placeholder="Comentario sobre el documento"
                      name="coment"
                      onChange={OnChangecoment}
                      value={coment}
                      required                     
                  />
                  <Label pointing>El comentario sirve para identificar al primer documento entre sus versiones. Por defecto sera ( Original ) </Label>
              </Form.Field>
              <Form.Field>
                      <MyButton type="submit"> Guardar </MyButton>
              </Form.Field>
          </Form>
        </Segment>
        <Dropzone />     
      </Container>   
        )
    }



export default  NewDocument;