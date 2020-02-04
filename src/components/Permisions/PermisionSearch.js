import React, { Component, useState } from 'react'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import _ from 'lodash'
import Avatar from '../../assets/Avatar.png'
import {deletePermision} from '../../actions/PermisionAction'
import {  Grid, Header, Segment, Modal, Icon, Label, Divider, List,  Button, Image } from 'semantic-ui-react'

import InputSearch from './InputSearch'

class PermisionSearch extends Component {
  constructor(props){
      super(props)
      this.state = {
          modalOpen: false,
          document_id:props.doc,
          permision: [],
          document:"",
          withPermisions:""
      }
  }

  async componentDidMount() {
    
    fetch('/document').then(res => res.json()).then((data) => {
        this.setState({permision:data.perms})
       })
  }

   handleOpen = ( () => this.setState({modalOpen: true}) );

   handleClose = ( () => this.setState({modalOpen: false}) )


  
  Delete = (id) => {
    this.props.deletePermision(id);
    this.setState({ modalOpen: false });
    this.componentDidMount();
    
}

    render() {
       
      const permisions = this.state.permision

      return (
            
        <Grid>
        <Grid.Column width={10}>
          <Segment>
          <Header><h2>Usuarios con permisos otorgados</h2></Header>
           <Divider/>
              {permisions.map(permision => (
                permision.document._id === this.state.document_id && 
                permision.requestAcepted === true ?
                  <List key={permision._id}>
                      <List.Item>
                        <List.Content floated='right'>
                        {permision.document.document_user != permision.withPermisions._id
                        ?    
                        <Modal trigger={
                         <Button
                         onClick={this.handleOpen}
                         icon='remove'
                         />}
                         dimmer='blurring' 
                         open={this.state.modalOpen}
                         onClose={this.handleClose}
                         basic
                         basic size='small'>
                       <Header icon='user' content='Agregar usuario' />
                        <Modal.Content>
                          <p>
                            Esta seguro de querer eliminar permisos sobre el documento para el usuario {permision.withPermisions.name}
                          </p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button basic color='red' inverted
                           onClick={this.handle }>
                            <Icon name='remove' /> Cancelar
                          </Button>
                          <Button color='green' inverted 
                             onClick = {this.Delete.bind(this, permision._id)}>
                            <Icon name='checkmark'/> Aceptar
                          </Button>
                        </Modal.Actions>
                       </Modal>
                        :
                        <Label content="Propietario" />
                        }
                        </List.Content>
                        <Image avatar src= {Avatar} />
                        <List.Content>{permision.withPermisions.name}</List.Content>
                      </List.Item>
                      <Divider/>
                  </List>
              : ""))
              }
          </Segment>    
        </Grid.Column>
        <Grid.Column width={5}>

          <InputSearch doc={this.props.doc} />
          
        </Grid.Column>
      </Grid>             
      )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, {deletePermision}) (withRouter(PermisionSearch))