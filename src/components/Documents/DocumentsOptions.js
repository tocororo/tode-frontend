import React, {Fragment, useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Dropdown, Icon, Modal, Header, Button , Form, Input, Grid, Popup, Transition, Container} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import {deleteDocument, getDocuments, updateDocumentName } from '../../actions/DocumentAction'

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

    /* const trigger = (
      <span>
        <Icon name='settings' size='large' color='red' onClick={handleTransition}/>
      </span>
    ) */
    
    const handleTransition = (()=> setState(prevState  => ({visible : !prevState.visible}) ))

    const handleOpen = ( () => setState({open: true}) );

    const handleClose = ( () => setState({open: false}) )

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
          <Icon.Group  size='large' onClick={handleRenameOpen}>
          <MyLink to = {"/edit_document_version/" + props.version}>
            <Icon name='edit' color='red' circular  size='small' inverted/>
          </MyLink> 
        </Icon.Group>}
      />
      <Popup
       size='tiny'
       content='Compartir'
       trigger={ 
         <Icon.Group  size='large' onClick={handleRenameOpen}>
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
           <Icon.Group  size='large'>
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
              <Icon.Group  size='large' onClick={handleOpen}>
                <Icon name='trash alternate outline' color='red' circular  size='small' inverted/> 
              </Icon.Group>
            }
          />
          }
          dimmer='blurring' 
          open={state.modalOpen}
          onClose={handleClose}
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
              onClick={handleClose }>
              <Icon name='remove' /> Cancelar
              </Button>
              <Button color='green' inverted 
                  onClick = {Delete}>
              <Icon name='checkmark'/> Aceptar
              </Button>
          </Modal.Actions>
          </Modal>
        </Fragment>
        /* <Dropdown
          trigger={trigger}
          pointing='top left'
          icon={null}
          floating
          fluid
        >
        <Dropdown.Menu >               
            <Dropdown.Item >
              <MyLink to = {"/permisions/" + props.document}>
                <Icon name='user plus' color='red'/>  Otorgar Permisios
              </MyLink>
            </Dropdown.Item>       
            <Modal trigger={
              <Dropdown.Item onClick={handleRenameOpen}>
                  <Icon name='pencil alternate' color='red'/> Renombrar
              </Dropdown.Item>
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
            <Dropdown.Item onClick={handleOpen}>
                <Icon name='trash alternate outline' color='red'/> Eliminar
            </Dropdown.Item>
            }
            dimmer='blurring' 
            open={state.modalOpen}
            onClose={handleClose}
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
                onClick={handleClose }>
                <Icon name='remove' /> Cancelar
                </Button>
                <Button color='green' inverted 
                    onClick = {Delete}>
                <Icon name='checkmark'/> Aceptar
                </Button>
            </Modal.Actions>
            </Modal>
        </Dropdown.Menu>
      </Dropdown> */
    )
}

export default DocumentsOptions