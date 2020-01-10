import React, { Component, useState } from 'react'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import _ from 'lodash'
import Avatar from '../../assets/Avatar.png'
import {getUsersToPermission} from '../../actions/UserAction'
import {newPermision,deletePermision} from '../../actions/PermisionAction'
import { Search, Grid, Header, Segment, Modal, Icon, Label, Divider, List, Popup, Button, Image, Form } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: ''}

class PermisionSearch extends Component {
  constructor(props){
      super(props)
      this.state = {
          modalOpenAdd: false,
          modalOpenRemove: false,
          document_id:props.doc,
          permision: [],
          document:"",
          document_user:""
      }
  }

  state = initialState

  async componentDidMount() {
      fetch('/document').then(res => res.json()).then((data) => {
          this.setState({permision:data.perms})
          
         })
       .catch(console.log);
    }
    
  handleResultSelect = (e, { result }) => this.setState({ value: result.name })
  
  handleSearchChange = (e, { value }) => 
    {
      this.setState({ isLoading: true, value })
      setTimeout(() => 
      {
      if (this.state.value.length < 1)
         return this.setState(initialState)  
            // si lo que el usuario ha escrito tiene mas de 2 letras
      else{
        if (this.state.value.length > 2){

          const {value, document_id} = this.state;
          this.props.getUsersToPermission({value, document_id}); 
          
          const {users} = this.props.user
          console.log(value);
          

          return this.setState({
            isLoading: false,
            results: users
              })
            }
          }
      }, 300)  

    }
      
  OnChange = (e, { doc,user }) => this.setState({ document:doc, document_user:user })
    
    
  OnSubmit = (e) => {
      e.preventDefault();
  
          const {document_user, document} = this.state;
          const newPermision = { document_user, document };
          this.props.newPermision(newPermision);  
          this.setState({ modalOpen: false });         
          this.componentDidMount();
  }
  
  Delete = (id) => {
      this.props.deletePermision(id);
      this.setState({ modalOpen: false });
      this.componentDidMount();
      
  }

  handleOpenAdd = () => this.setState({ modalOpenAdd: true })
  handleOpenRemove = () => this.setState({ modalOpenRemove: true })

  handleCloseAdd = () => this.setState({ modalOpenAdd: false })
  handleCloseAdd = () => this.setState({ modalOpenRemove: false })



    render() {
       
        const permisions = this.state.permision
        const { isLoading, value, results } = this.state

        return (
            
                <Grid>
                  <Grid.Column width={10}>
                    <Segment>
                    <Header><h2>Usuarios con permisos otorgados</h2></Header>
                     <Divider/>
                        {permisions.map(permision => (
                            permision.document._id === this.state.document_id ?
                            <List key={permision._id}>
                                <List.Item>
                                  <List.Content floated='right'>
                                  {permision.document.document_user != permision.document_user._id
                                  ?    
                                  <Modal trigger={
                                   <Button
                                   onClick={this.handleOpenRemove}
                                   icon='remove'
                                   />}
                                   dimmer='blurring' 
                                   open={this.state.modalOpen}
                                   onClose={this.handleClose}
                                   content="Otorgar permisios a este usuario"
                                   basic
                                   basic size='small'>
                                 <Header icon='user' content='Agregar usuario' />
                                  <Modal.Content>
                                    <p>
                                      Esta seguro de querer eliminar permisos sobre el documento para el usuario {permision.document_user.name}
                                    </p>
                                  </Modal.Content>
                                  <Modal.Actions>
                                    <Button basic color='red' inverted
                                     onClick={this.handleClose }>
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
                                  <List.Content>{permision.document_user.name}</List.Content>
                                </List.Item>
                                <Divider/>
                            </List>
                        : ""))
                        }
                    </Segment>    
                  </Grid.Column>
                  <Grid.Column width={5}>
                  <Search
                      loading={isLoading}
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                      })}
                      results={results}
                      resultRenderer={({ name, rol, _id }) => 
                      <Grid >
                        <Grid.Column width={4}>                              
                        <Modal trigger={
                            <Button 
                            onClick={this.handleOpenAdd}
                            icon='add'
                            />}
                            dimmer='blurring'
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            basic size='small'>
                          <Header icon='user' content='Agregar usuario' />
                           <Modal.Content>
                             <p>
                               Esta seguro de querer otorgar permisos sobre el documento al usuario {name}
                             </p>
                           </Modal.Content>
                           <Form onSubmit={this.OnSubmit}>                              <Modal.Actions>    
                            <Form.Field> 
                             <Button basic color='red' inverted
                             onClick={this.handleClose }>
                               <Icon name='remove' /> Cancelar
                             </Button>
                               
                             <Button color='green' inverted 
                                doc = {this.state.document_id}
                                user = {_id}
                                onClick = {this.OnChange}
                                type='submit'>
                               <Icon name='checkmark'/> Aceptar
                             </Button>
                            </Form.Field>
                            </Modal.Actions>
                            </Form> 
                          
                        </Modal>

                        </Grid.Column>
                        <Grid.Column width={6}>
                            <p>{name} </p>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <p>{rol} </p>
                        </Grid.Column>
                      </Grid> 
                     
                      }
                      value={value}
                      {...this.props}
                    />
                  </Grid.Column>
                </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    auth : state.auth
})

export default connect(mapStateToProps, {getUsersToPermission, newPermision,deletePermision}) (withRouter(PermisionSearch))