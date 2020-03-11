import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom';
import { Button, Form, TextArea, Container, Input, Radio, Segment } from 'semantic-ui-react'
import '../../css/editpage.css'
import styled from 'styled-components'

import { newDocument_version} from '../../actions/DocumentVersionAction'
import DocumentModal from '../Utils/DocumentModal'

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

function AddContent(props) {

  const history = useHistory()  
    /* creando variables de estado y un metodo para modificarlas */
  const [text, setText] = useState('');
  const [document, setDocument] = useState('');
  const [image, setImage] = useState('');
  const [comment, setComment] = useState('Original');
  const [document_user, setDocument_user] = useState('');

  /* utilizando variables de los reducers.js */
  const { doc}  = useSelector(state => state.doc);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  const {errorsMessages} = useSelector(state => state.error)
  
  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()

  useEffect(()=>
    console.log(errorsMessages)    
  ,[doc._id, errorsMessages]) 
   
    const OnChange = e => {
        setText( e.target.value, );  
        if (oauth2IsAuthenticated) {
          setDocument_user(oauth2Users._id)    
          setDocument(doc._id)     
      }        
    };

    const OnChangeImage = e => {
      setImage( e.target.files[0], ); 
      
    };    

    const OnSubmit = (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('comment', comment);
      formData.append('document_user', document_user);
      formData.append('document', document);
      formData.append('text', text);
      formData.append('image', image);
      dispatch(newDocument_version(formData, history));
  }
       
      return (          
        <Container>

          <DocumentModal type='new_document' />
          <Segment >
            <h2 className='title'>Añadir Documento: Paso 2</h2>
              <Form onSubmit={OnSubmit} >
                  <Form.Field>
                      <TextArea
                          style={{ minHeight: 100}}
                          type="text"
                          id="text"
                          name="text"
                          onChange={OnChange}
                          value={text}
                          required
                      />
                  </Form.Field>
                  <Form.Field>
                      <Input
                          type="file"
                          name='image'
                          onChange={OnChangeImage}
                      />
                  </Form.Field>
                  
                  <Form.Field>
                      <MyButton type="submit"> Guardar </MyButton>
                  </Form.Field>
              </Form>
            </Segment>
        </Container>
        )
    }


export default (AddContent)