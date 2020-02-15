import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory,} from 'react-router-dom';
import { newDocument } from '../../actions/DocumentAction'
import { Container, Button, Form, Input, Segment, Label, Radio } from 'semantic-ui-react';
import styled from 'styled-components'

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
  const [document_user, setDocument_user] = useState('')
  const [checkedForm, setCheckedForm] = useState(false);
  const [chekedDropzone, setChekedDropzone] =  useState(false);
  const [url, setUrl] =  useState('');  

  /* utilizando variables de los reducers.js */
  // const {user, isAuthenticated} = useSelector(state => state.auth)
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()
  const OnChangename = (e) => {
  setName(e.target.value );
  if(oauth2IsAuthenticated){
  setDocument_user(oauth2Users._id)   } 
  };

  const OnChangecoment = (e) => {
    setComent( e.target.value );
    };

  const toggleForm = () => {
    setCheckedForm(!checkedForm);
    setChekedDropzone(false);     
    setUrl(`/add-content/${name}`)
     
  }
  const toggleDropzone = () => {
    setChekedDropzone(!chekedDropzone);
    setCheckedForm(false);  
    setUrl(`/dropzone/${name}`)
  } 

  const OnSubmit = (e) => {
    e.preventDefault();    

    const newDoc = { name, coment, document_user };
    dispatch(newDocument(newDoc, history, url));  

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
                <Segment.Group horizontal>
                <Segment>
                  <Radio
                    label='No tengo un articulo preparado'
                    onClick={toggleForm}
                    checked={checkedForm}
                  />
                </Segment>
                <Segment >
                  <Radio
                    label='Tengo un articulo preparado'
                    onClick={toggleDropzone}
                    checked={chekedDropzone}
                  />
                </Segment>
                </Segment.Group>
              </Form.Field>
              <Form.Field>
                      <MyButton type="submit"> Guardar </MyButton>
              </Form.Field>
          </Form>
        </Segment>   
      </Container>   
        )
    }



export default  NewDocument;