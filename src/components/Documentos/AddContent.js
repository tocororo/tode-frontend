import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom';
import { Button, Form, TextArea, Sidebar, Container, Input, Divider } from 'semantic-ui-react'
import '../../css/editpage.css'
import '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { createText } from '../../actions/DocumentAction'

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

  /* utilizando variables de los reducers.js */
  const user = useSelector(state => state.auth.user);
  const { doc}  = useSelector(state => state.doc);
  
  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()

   
    const OnChange = e => {
        setText( e.target.value, );        
        setDocument (doc._id )
        
    };

    const OnChangeImage = e => {
      setImage( e.target.value, ); 
      
  };

    const OnSubmit = (e) => {
        e.preventDefault();

        const newText = { text,  document };
        dispatch(createText(props.match.params.name, newText, history));
    }
       
        return (          
          <Container>
            <h1 className='title'>Añadir Documento</h1>
            <Divider />
            <h2 className='title'>Paso 2</h2>
              <Form onSubmit={OnSubmit} enctype="multipart/form-data" action="/createText" method="post">
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
                          id="image"
                          name="image"
                          onChange={OnChangeImage}
                          value={image}
                          required
                      />
                  </Form.Field>
                  
                  <Form.Field>
                      <MyButton type="submit"> Guardar </MyButton>
                  </Form.Field>
              </Form>
            </Container>
        )
    }


export default (AddContent)