import React, {Fragment, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Icon, Dropdown, Modal, Button, Message, Label, Table} from 'semantic-ui-react'
import {  getNotificationForPermisions, deleteNotification} from '../../actions/NotificationAction'
import styled from 'styled-components'


const MyIcon = styled(Icon)`
  &&& {
   color: white;

   &&&:hover{
    color: grey;
  }
`
function Request(props)  { 

  const {notifications} = useSelector(state => state.notification);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  
  const dispatch = useDispatch()

  const OnCancel = (e, document) => {    
    dispatch(deleteNotification(document.id))
  }

  const NotificationCheckedForPermision = (e, { document, forPermisions }) => {
    dispatch(getNotificationForPermisions({document, forPermisions}) );
  }

  const trigger =  (
    <Fragment>
      <MyIcon name='users' size='big' /> {
      props.count !== 0 ?
      <Label color='red' size='mini' floating ><strong>{props.count}</strong></Label>
      : null
      }
    </Fragment>
  )

  var notificaciones = new Array()
  notifications.forEach((notify, index) => {
    if(oauth2IsAuthenticated && notify.forPermisions && notify.forPermisions._id === oauth2Users._id) {
      notificaciones[index] = notify
    }
  });

  return (
         
    <Dropdown trigger={trigger}  pointing='top right' icon={null}> 
      <Dropdown.Menu >
        <Dropdown.Menu scrolling>
        {
        notificaciones.length > 0 ?
          notificaciones.map(notify => (

        // NOTIFICACIONS FOR PERMISIONS
        /* oauth2IsAuthenticated && notify.forPermisions && notify.forPermisions._id === oauth2Users._id ? */
        <Fragment  key={notify._id}>
        <Dropdown.Header children ={
        <Fragment>
        <span className="message">{notify.notification}</span>
        <br/>
        <span className="name">{notify.document.name}</span>
        </Fragment>
        }/>
        {notify.notificationSied === false ?
          <Dropdown.Header                      
            content= {
            <Fragment>
              <Button.Group size='mini' >
                <Button  type='submit'
                  document = {notify.document._id}    
                  onClick = {NotificationCheckedForPermision} >
                  <Icon name='checkmark'/> Aceptar
                </Button>
              <Button.Or />
                <Button 
                  id = {notify.document._id}   
                  onClick={OnCancel}>
                  <Icon name='remove' /> Cancelar
                </Button>
              </Button.Group><span className="date">{notify.document.createdAt}</span>                           
            </Fragment>                  
            }                        
              /> 
          :null}
        </Fragment>
        //:               
        ))

        :
        <Dropdown.Header
        children = 'Sin solicitudes aun'
        /> 
        }

        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Request
