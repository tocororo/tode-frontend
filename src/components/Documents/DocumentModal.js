import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import _ from 'lodash'
import {  Modal, Icon, Label, Button, Form, Input } from 'semantic-ui-react'

import {newDocument} from '../../actions/DocumentAction'


function DocumentModal(props) {

   const [modalCreate, setModalCreate] = useState(true);
   const [modalEdit, setModalEdit] = useState(false);
   const [name, setName] = useState('');
   const [document_user, setDocument_user] = useState('');
   const [comment, setComment] = useState('');

   const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)

   useEffect( () =>{
       setModalEdit(props.edit)
        
   },[props.edit])

   const dispatch = useDispatch()
   const history = useHistory()  

   const redirect = () => history.push('/documents')

   const handleCreate = () => {
    setModalCreate( false )  
   }
   const handleEdit = () => {
    setModalEdit( false )  
   }

   const OnChangeName = (e) => {
    setName( e.target.value); 
    if (oauth2IsAuthenticated) {
        setDocument_user(oauth2Users._id)         
    } 
   }
  
   const OnChangecoment = (e) => {
    setComment(e.target.value);
   }

   const OnSubmitDocument = (e) => {
    e.preventDefault();
    const newDoc = {name, document_user}; 
    dispatch(newDocument(newDoc));   
    handleCreate();    
   }

    return(
        
        props.type === 'new_document' ? 
        <Modal 
            dimmer='blurring' 
            open={modalCreate}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            >
        <Modal.Header 
        icon='user' 
        children='Escriba el nombre que desea para el documento' />
        <Modal.Content>
        <Form onSubmit={OnSubmitDocument }>
        <Form.Field>
            <Input
                type="text"
                placeholder="Nombre del documento"
                name="name"
                onChange={OnChangeName}
                value={name}             
            />
        </Form.Field>
        <Modal.Actions>
            <Button color='red' inverted
            onClick={redirect}>
            <Icon name='remove' /> Cancelar
            </Button>
            <Button color='green' inverted type='submit' >
            <Icon name='checkmark'/> Aceptar
            </Button>
        </Modal.Actions>
        </Form>
        </Modal.Content>
        </Modal>        
        :
        <Modal 
        dimmer='blurring' 
        open={modalEdit}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        >
        <Modal.Header 
        icon='user' 
        children='Escriba un comentario para poder dierenciar las versiones' />
        <Modal.Content>
        <Form onSubmit={props.OnSubmitVersion(comment)}>
        <Form.Field> 
            <Input
                type="text"
                placeholder="Comentario"
                name="comment"
                onChange={OnChangecoment}
                value={comment}            
            />
        </Form.Field>        
        <Modal.Actions>
            <Button color='red' inverted
            onClick={handleEdit }>
            <Icon name='remove' /> Cancelar
            </Button>
            <Button color='green' inverted type='submit'>
            <Icon name='checkmark'/> Aceptar
            </Button>
        </Modal.Actions>
        </Form>
        </Modal.Content>
        </Modal>
    )
}

export default DocumentModal