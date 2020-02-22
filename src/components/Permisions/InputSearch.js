import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom';
import _ from 'lodash'
import {newPermision} from '../../actions/PermisionAction'
import {getUsersToPermission} from '../../actions/UserAction'
import { Search, Grid, Header, Modal, Icon, Button, Form } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: ''}

class InputSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalOpen: false,
            document:props.document_id,
            withPermisions:""
        }
        
    }


    handleOpen = ( () => this.setState({modalOpen: true}) );

    handleClose = ( () => this.setState({modalOpen: false}) )

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

          const {value, document} = this.state;
          this.props.getUsersToPermission({value, document}); 
          
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
      
  OnChange = (e, { user }) => this.setState({ withPermisions:user })
    
    
  OnSubmit = (e) => {
      e.preventDefault();
  
          const {withPermisions, document} = this.state;
          const newPermision = { withPermisions, document };
          this.props.newPermision(newPermision);  
          this.setState({ modalOpen: false });  
  }


  render(){
    const { isLoading, value, results } = this.state
    return(  
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
              <Icon 
              onClick={this.handleOpen}
              name='plus'
              color='teal'
              />
            }
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
             <Form onSubmit={this.OnSubmit}><Modal.Actions>    
              <Form.Field> 
               <Button basic color='red' inverted
               onClick={this.handleClose }>
                 <Icon name='remove' /> Cancelar
               </Button>
                 
               <Button color='green' inverted 
                  // user = {_id}
                  onClick = {this.OnChange.bind(this, _id)}
                  type='submit'>
                 <Icon name='checkmark'/> Aceptar
               </Button>
              </Form.Field>
              </Modal.Actions>
              </Form> 
            
          </Modal>

          </Grid.Column>
          {<Grid.Column width={6}>
              <p>{name} </p>
          </Grid.Column>}
          {/* <Grid.Column width={5}>
              <p>{rol} </p>
          </Grid.Column> */}
        </Grid> 
       
        }
        value={value}
        {...this.props}
      />
    )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, {getUsersToPermission,newPermision}) (withRouter(InputSearch))