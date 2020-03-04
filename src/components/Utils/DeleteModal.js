import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {deletePermision} from '../../actions/PermisionAction'
import {  Header, Modal, Icon, Label, Button } from 'semantic-ui-react'

class DeleteModal extends Component{

    constructor(props){
        super(props)
        this.state = {
            modalOpen: false,
            permision_id: props.permision_id,
            name:props.name,
            nameLabel: props.nameLabel,
            color: props.color
        }
    }

   handleOpen = ( () => this.setState({modalOpen: true}) );

   handleClose = ( () => this.setState({modalOpen: false}) )


  
  Delete = (id) => {
    this.props.deletePermision(id);
    this.setState({ modalOpen: false });
    
}

    render(){
    return(
        <Label  as='a' color={this.state.color} tag > 
        {this.state.nameLabel} 
        <Modal trigger={
            <Icon color='black' name='delete' onClick={this.handleOpen} />
            }
            dimmer='blurring' 
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            basic size='small'>
        <Header icon='user' content='Agregar usuario' />
        <Modal.Content>
            <p>
            Esta seguro de querer eliminar permisos sobre el documento para el usuario {this.state.name}
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color='red' inverted
            onClick={this.handleClose }>
            <Icon name='remove' /> Cancelar
            </Button>
            <Button color='green' inverted 
                onClick = {this.Delete.bind(this, this.state.permision_id)}>
            <Icon name='checkmark'/> Aceptar
            </Button>
        </Modal.Actions>
        </Modal>
        </Label>
    )
    }
}

export default connect(null,{deletePermision})(DeleteModal)