import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Dropdown, Icon, Modal, Header, Button , Form, Input} from 'semantic-ui-react'
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
      modalOpen: false,
      renameOpen: false,
    })
    const [name, setName] = useState('')

    useEffect( () =>{
      dispatch(getDocuments());
    },[])

    const dispatch = useDispatch();

    const trigger = (
      <span>
        <Icon name='settings' size='large' color='red'/>
      </span>
    )

    const handleOpen = ( () => setState({modalOpen: true}) );

    const handleClose = ( () => setState({modalOpen: false}) )

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
      setState({ modalOpen: false });    
    }

    return(
      <Dropdown
        trigger={trigger}
        pointing='top left'
        icon={null}
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
      </Dropdown>
    )
}

export default DocumentsOptions