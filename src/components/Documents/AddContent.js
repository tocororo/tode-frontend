import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom';
import { Button, Form, TextArea, Container, Input, Radio, Segment } from 'semantic-ui-react'
import '../../css/editpage.css'
import styled from 'styled-components'

import Dropzone from './Dropzone'

import { createText, getDocumentByName } from '../../actions/DocumentAction'

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
  const { doc}  = useSelector(state => state.doc);
  
  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()

  useEffect(()=>
    dispatch(getDocumentByName(props.match.params.name))
  ,[])
   
    const OnChange = e => {
        setText( e.target.value, );         
    };

    const OnChangeImage = e => {
      setImage( e.target.files[0], ); 
      
    };

    /* const toggleForm = () => {setCheckedForm(!checkedForm); setChekedDropzone(!chekedDropzone)}
    const toggleDropzone = () => {setChekedDropzone(!chekedDropzone); setCheckedForm(!checkedForm)} */

    const OnSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('text', text);
        formData.append('image', image);
        dispatch(createText(props.match.params.name, formData, history));
    }
       
      return (          
        <Container>
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