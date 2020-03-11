import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import _ from 'lodash'
import Avatar from '../../assets/Avatar.png'
import {deletePermision} from '../../actions/PermisionAction'
import {getDocuments} from '../../actions/DocumentAction'
import {  Grid, Header, Segment, Label, Divider, List, Image } from 'semantic-ui-react'

import InputSearch from './InputSearch'
import DeleteModal from '../Utils/DeleteModal'

class PermisionSearch extends Component {
  constructor(props){
      super(props)
      this.state = {
          modalOpen: false,
          document:props.document_id,
          permision: [],
          withPermisions:""
      }
  }

  componentDidMount() {
    this.props.getDocuments()
  }

    render() {
       
      const {perms} = this.props.doc

      return (
            
        <Grid>
        <Grid.Column width={10}>
          <Segment>
          <Header><h2>Usuarios con permisos otorgados</h2></Header>
           <Divider/>
              {perms.map(permision => 
                permision.document._id === this.state.document ?
                  <List key={permision._id}>
                      <List.Item>
                        <List.Content floated='right'>
                        {permision.document.document_user !== permision.withPermisions._id  && 
                          permision.requestAcepted === false ?

                          <DeleteModal 
                            permision_id={permision._id} 
                            name={permision.withPermisions.name} 
                            nameLabel='Pendiente'
                            color='orange'/>
                        :
                        permision.document.document_user !== permision.withPermisions._id  && 
                          permision.requestAcepted === true ?
                          <DeleteModal 
                            permision_id={permision._id} 
                            name={permision.withPermisions.name} 
                            nameLabel='Invitado'
                            color='teal'/>
                        : 
                        permision.document.document_user === permision.withPermisions._id ?   
                          <Label  as='a' color='teal' tag > Propietario </Label>
                        :null
                        }
                        </List.Content>
                        <Image avatar src= {Avatar} />
                        <List.Content>{permision.withPermisions.name}</List.Content>
                      </List.Item>
                      <Divider/>
                  </List>
              : null)
              }
          </Segment>    
        </Grid.Column>
        <Grid.Column width={5}>

          <InputSearch document_id={this.state.document} />
          
        </Grid.Column>
      </Grid>             
      )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    doc: state.doc
})

export default connect(mapStateToProps, {deletePermision, getDocuments}) (withRouter(PermisionSearch))