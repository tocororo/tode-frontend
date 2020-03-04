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
  /* const [checkedForm, setCheckedForm] = useState(true);
  const [chekedDropzone, setChekedDropzone] =  useState(false); */

  /* utilizando variables de los reducers.js */
  const { doc}  = useSelector(state => state.doc);
  
  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()

  useEffect(()=>
    dispatch(getDocumentByName(props.match.params.name))
  ,[])
   
    const OnChange = e => {
        setText( e.target.value, );        
        setDocument (doc._id )
        
    };

    const OnChangeImage = e => {
      setImage( e.target.value, ); 
      
    };

    /* const toggleForm = () => {setCheckedForm(!checkedForm); setChekedDropzone(!chekedDropzone)}
    const toggleDropzone = () => {setChekedDropzone(!chekedDropzone); setCheckedForm(!checkedForm)} */

    const OnSubmit = (e) => {
        e.preventDefault();

        const newText = { text,  document };
        dispatch(createText(props.match.params.name, newText, history));
    }
       
      return (          
        <Container>
          <Segment >
            <h2 className='title'>Añadir Documento: Paso 2</h2>{/* 
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
            {
              checkedForm === true ?  */}
              <Form onSubmit={OnSubmit} encType="multipart/form-data" action="/createText" method="post">
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
              {/* :
            chekedDropzone === true ?
            <Dropzone name={props.match.params.name} doc_id={doc._id}/>
            :null
            } */}
            </Segment>
        </Container>
        )
    }


export default (AddContent)