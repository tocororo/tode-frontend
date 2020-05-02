import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import Avatar from '../../assets/Avatar.png'
import {deletePermision} from '../../actions/PermisionAction'
import {getPermisions} from '../../actions/PermisionAction'
import {  Grid, Header, Segment, Label, Divider, List, Image } from 'semantic-ui-react'

import InputSearch from './InputSearch'
import DeleteModal from '../Utils/DeleteModal'

function PermisionSearch(props) {
  const [state, setstate] = useState({
    modalOpen: false,
    document:props.document_id,
    withPermisions:""
  })

  const {permisions} = useSelector(state => state.permision);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect( () => {
    const id = state.document
    dispatch(getPermisions(id));   
  },[]);

      return (
            
        <Grid>
        <Grid.Column width={10}>
          <Segment>
          <Header><h2>Usuarios con permisos otorgados</h2></Header>
           <Divider/>
              {permisions.map(permision => 
                permision.document && permision.document._id == state.document ?
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

          <InputSearch document_id={state.document} />
          
        </Grid.Column>        
      </Grid>             
      )
}

export default PermisionSearch