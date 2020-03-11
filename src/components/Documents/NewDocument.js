import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory,} from 'react-router-dom';
import { newDocument } from '../../actions/DocumentAction'
import { Container, Button, Form, Input, Segment, Label, Radio, TextArea } from 'semantic-ui-react';
import styled from 'styled-components'
import classnames from 'classnames'
import {ConfirmContext} from '../contexts/ConfirmContext'
import DocumentModal from '../Utils/DocumentModal'
import AddContent from './AddContent';

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
  const {toogleOpen} = useContext(ConfirmContext)
  
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  //const [coment, setComent] = useState('Original');
  const [document_user, setDocument_user] = useState('');
  //const [checkedContent, setCheckedContent] = useState(false);
  //const [chekedDropzone, setChekedDropzone] =  useState(false);
  //const [url, setUrl] =  useState('');  
  //const [errorContent, setErrorContent] = useState('');
  //const [errorDropzone, setErrorDropzone] = useState('');

  /* utilizando variables de los reducers.js */
  // const {user, isAuthenticated} = useSelector(state => state.auth)
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  const {errorsMessages} = useSelector(state => state.error)
  
  useEffect(() =>{
  },[errorsMessages/* , errorContent, errorDropzone */])

  /*  dispatch para utilizar las actions.js */
  /* const dispatch = useDispatch()
  const OnChangename = (e) => {
    setName(e.target.value );
    if(oauth2IsAuthenticated){
      setDocument_user(oauth2Users._id)  
     }     
  };

  const OnChangecoment = (e) => {
    setComent( e.target.value );
  }; */

  /* const toggleContent = () => {
    if(name !== ''){
    setCheckedContent(!checkedContent);
    setChekedDropzone(false); 
    setUrl(`/add-content/${name}`)
    setErrorDropzone('') ;   
    }else{      
      setErrorContent('Introduzca antes un nombre para el documento')
      setErrorDropzone('')
    }
  }
  const toggleDropzone = () => {
    if (name !== '') {      
    setChekedDropzone(!chekedDropzone);
    setCheckedContent(false); 
    setUrl(`/dropzone/${name}`)    
    setErrorContent('') ;  
    }else{
      setErrorDropzone('Introduzca antes un nombre para el documento')
      setErrorContent('')
    }
  }  */

  /* const OnSubmit = (e) => {
    e.preventDefault();     

    if(checkedContent === true || chekedDropzone === true ){      
      const newDoc = { name, document_user };
      dispatch(newDocument(newDoc , history, url ));
      setErrorContent('')
      setErrorDropzone('')
    }else{
      setErrorContent('Seleccione una opcion')
      setErrorDropzone('Seleccione una opcion')
    }
  } */
  const handleOpen = () => {
    setOpen( prev => !prev.open )
    console.log(open);
    
  }
    return (
      
      <Container>
      <DocumentModal type='new_document' handleOpen={handleOpen} create={open} />
      <AddContent />
            </Container>
      /* <Container>
        <Segment color='blue' padded='very'><h2>Añadir Documento: Paso 1</h2>
          <Form onSubmit={OnSubmit}>
              <Form.Field
                label='Nombre del documento'
                control={Input}
                error={
                  errorsMessages.name &&
                  {
                  content: errorsMessages.name,
                  pointing: 'below',
                }}
                type="text"
                placeholder="Nombre del documento"
                name="name"
                onChange={OnChangename}
                value={name}
                className={classnames(null, {'is-invalid': errorsMessages.name})}                
                  />
                  <Form.Field
                    label='Nombre del documento'
                    control={Input}
                    error={
                      errorsMessages.coment &&
                      {
                      content: errorsMessages.coment,
                      pointing: 'below',
                    }}
                    control={Input}
                    type="text"
                    placeholder="Comentario sobre el documento"
                    name="coment"
                    onChange={OnChangecoment}
                    value={coment}
                    className={classnames(null, {'is-invalid': errorsMessages.coment})}                    
                  />             
                <Segment.Group horizontal>
                <Segment>                
                <Form.Field 
                  control={Radio}
                  error={
                    errorContent !== '' &&
                    {
                    content: errorContent,
                    pointing: 'below',
                  }}
                  label='No tengo un articulo preparado'
                  onClick={toggleContent}
                  checked={checkedContent}
                  />
                </Segment>
                <Segment >
                <Form.Field 
                  control={Radio}
                  error={
                    errorDropzone !== '' &&
                    {
                    content: errorDropzone,
                    pointing: 'below',
                  }}
                  label='Tengo un articulo preparado'
                  onClick={toggleDropzone}
                  checked={chekedDropzone}
                  />
                </Segment>
                </Segment.Group>
              <Form.Field>
                      <MyButton onClick={toogleOpen} type="submit"> Guardar </MyButton>
              </Form.Field>
          </Form>
        </Segment>   
      </Container>    */
        )
    }



export default  NewDocument;