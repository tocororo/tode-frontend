import React, { Component, useState } from 'react'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import _ from 'lodash'
import Avatar from '../../assets/Avatar.png'
import {newPermision,deletePermision} from '../../actions/PermisionAction'
import { Search, Grid, Header, Segment, Table, Label, Divider, List, Popup, Button, Image, Form } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: ''}

class PermisionSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
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

    async componentDidUpdate() {
        fetch('/document').then(res => res.json()).then((data) => {
            this.setState({permision:data.perms})
            
           })
         .catch(console.log);
      }

    handleResultSelect = (e, { result }) => this.setState({ value: result.name })

    handleSearchChange = (e, { value }) => {
        const {users} = this.props.user
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.setState(initialState)
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = (result) => re.test(result.name)
    
          this.setState({
            isLoading: false,
            results: _.filter(users, isMatch),
          })
        }, 300)
      }
      
OnChange = (e, { doc,user }) => this.setState({ document:doc, document_user:user })


OnSubmit = (e) => {
    e.preventDefault();

        const {document_user, document} = this.state;
        const newPermision = { document_user, document };
        this.props.newPermision(newPermision);           
        this.props.history.push('/permisions/' + this.state.document_id);
}

Delete = (id) => {
    this.props.deletePermision(id);
    alert('Permiso removido');
}


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
                            <List >
                                <List.Item>
                                  <List.Content floated='right'>
                                  {permision.document.document_user != permision.document_user._id
                                  ?    
                                  <Popup
                                    trigger={
                                    <Button 
                                    onClick={this.Delete.bind(this, permision._id)}
                                    icon='delete' />}
                                    content="Revocar permisios a este usuario"
                                    basic
                                  />
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

                      <Form onSubmit={this.OnSubmit}>    
                      <Form.Field>    
                      <Grid >
                        <Grid.Column width={4}>                              
                        <Popup
                            trigger={
                            <Button 
                            doc = {this.state.document_id}
                            user = {_id}
                            onClick = {this.OnChange}
                            type='submit'
                            icon='add' />}
                            content="Otorgar permisios a este usuario"
                            basic
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Label content={name} />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Label content={rol} />
                        </Grid.Column>
                      </Grid> 
                      </Form.Field>
                      </Form> 
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

export default connect(mapStateToProps, {newPermision,deletePermision}) (withRouter(PermisionSearch))