import React, {Fragment, useState, useEffect, useContext} from 'react'
import {useDispatch} from 'react-redux'
import { Icon, Modal, Header, Button , Form, Input, Popup} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {deleteDocument, getDocuments, updateDocumentName } from '../../actions/DocumentAction'
import { ChatContext } from '../contexts/ChatContext';

const MyLink = styled(Link)`
  &&& {
    color:black;
  }
`

function DocumentsOptions (props) {
    const [state,setState] = useState({ 
      open: false,
      visible: false,
      renameOpen: false,
    })
    const [name, setName] = useState('')

    useEffect( () =>{
      dispatch(getDocuments());
    },[])

    const dispatch = useDispatch();
    const {showIcon} = useContext(ChatContext)

    /* const trigger = (
      <span>
        <Icon name='settings' size='large' color='red' onClick={handleTransition}/>
      </span>
    ) */
    
    const handleTransition = (()=> setState(prevState  => ({visible : !prevState.visible}) ))

    const handleDeleteOpen = ( () => setState({deleteOpen: true}) );

    const handleDeleteClose = ( () => setState({deleteOpen: false}) )

    const handleRenameOpen = ( () => setState({renameOpen: true}) );

    const handleRenameClose = ( () => setState({renameOpen: false}) )
    

    const OnSubmit = (e) =>{
      e.preventDefault();
      const id = props.document
      dispatch(updateDocumentName(id,name))
      setState({renameOpen: false})
    }

    const OnChangeName = (e) => {
      setName( e.target.value );      
    };
    

    const Delete = () => {
      dispatch(deleteDocument(props.document))
      setState({ open: false });    
    }

  return(  
    <Fragment>
      <Popup
        size='tiny'
        content='Editar Documento'
        trigger={ 
          <Icon.Group  size='large' onClick={showIcon}>
          <MyLink to = {"/edit_document_version/" + props.version}>
            <Icon name='edit' color='red' circular  size='small' inverted/>
          </MyLink> 
        </Icon.Group>}
      />
      <Popup
       size='tiny'
       content='Compartir'
       trigger={ 
         <Icon.Group  size='large' >
          <MyLink to = {"/permisions/" + props.document}>
            <Icon name='share square' color='red' circular  size='small' inverted/>
          </MyLink> 
        </Icon.Group>}
      />
        <Modal trigger={
         <Popup
         size='tiny'
         content='Renombrar'
         trigger={
           <Icon.Group  size='large' onClick={handleRenameOpen}>
             <Icon name='pencil alternate' color='red' circular  size='small' inverted/>
           </Icon.Group>}
         />
        }
         size='mini' 
         open={state.renameOpen} 
         onClose={handleRenameClose}>
           <Modal.Content>
           <Form onSubmit={OnSubmit}>
               <Form.Field>
                   <Input
                       type="text"
                       placeholder="Nombre del documento"
                       name="name"
                       onChange={OnChangeName}
                       value={name}
                       required                     
                   />
               </Form.Field>
               <Modal.Actions>
                 <Button onClick={handleRenameClose} negative>Cancelar</Button>
                 <Button
                   positive
                   icon='checkmark'
                   labelPosition='right'
                   content='Guardar'
                   type='submit'
                 />
               </Modal.Actions>
           </Form>
           </Modal.Content>
           
        </Modal>  
        <Modal trigger={
          <Popup
            size='tiny'
            content='Eliminar'
            trigger={
              <Icon.Group  size='large' onClick={handleDeleteOpen} >
                <Icon name='trash alternate outline' color='red' circular  size='small' inverted/> 
              </Icon.Group>
            }
          />
          }
          dimmer='blurring' 
          open={state.deleteOpen}
          onClose={handleDeleteClose}
          basic
          size='small'>
          <Header icon='user' content='Agregar usuario' />
          <Modal.Content>
              <p>
              Esta seguro de querer eliminar el documento 
              </p>
          </Modal.Content>
          <Modal.Actions>
              <Button basic color='red' inverted
              onClick={handleDeleteClose }>
              <Icon name='remove' /> Cancelar
              </Button>
              <Button color='green' inverted 
                  onClick = {Delete}>
              <Icon name='checkmark'/> Aceptar
              </Button>
          </Modal.Actions>
          </Modal>
        </Fragment>
        
    )
}

export default DocumentsOptions