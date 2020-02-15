import React, {Fragment, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Icon, Dropdown, Modal, Button, Message, Label} from 'semantic-ui-react'
import {  getNotificationForPermisions, deleteNotification} from '../../actions/NotificationAction'
import MessagesForVersions from './MessagesForVersions'
import styled from 'styled-components'


const MyIcon = styled(Icon)`
  &&& {
   color: grey;

   &&&:hover{
    color: white;
  }
`
function Request(props)  { 

  const [modalOpen, setModalOpen] =useState(false)

  const {notifications} = useSelector(state => state.notification);
  // const {users, isAuthenticated} = useSelector(state => state.auth); 
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  
  const dispatch = useDispatch()

  const handleOpen = () => setModalOpen(true) ;

  const OnCancel = (e, {id}) => {
    dispatch(deleteNotification({id}))
    setModalOpen(false);    
  }

  const NotificationCheckedForPermision = (e, { document }) => {
    dispatch(getNotificationForPermisions({document}) );
    setModalOpen(false)
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

        return (
                <Dropdown trigger={trigger}  pointing='top right'  icon={null}> 
                <Dropdown.Menu >
                {
                notifications.map(notify => (

                // NOTIFICACIONS FOR PERMISIONS
                oauth2IsAuthenticated && notify.forPermisions === oauth2Users._id ?
                <Modal 
                  trigger={
                  <Dropdown.Item active key={notify._id}           
                      onClick={handleOpen}>

                    <MessagesForVersions 
                      notification={notify.notification} 
                      name={notify.document.name} 
                      date={notify.createdAt}  
                      notificationSied={notify.notificationSied}/>
                  </Dropdown.Item>
                }
                  dimmer='blurring' 
                  open={modalOpen}
                  basic
                  size='small'>
                  <Modal.Content>
                    <p>
                      un usuario quiere compartir un documento con ud 
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color='red' inverted
                      id={notify._id}
                      onClick={OnCancel }>
                      <Icon name='remove' /> Cancelar
                    </Button>
                    <Button color='green' inverted type='submit'
                        document = {notify.document._id}    
                        onClick = {NotificationCheckedForPermision} >
                      <Icon name='checkmark'/> Aceptar
                    </Button>
                  </Modal.Actions>
                </Modal>
                : 
                <Message
                  size='small'
                  color='grey'
                  header='Sin solicitudes aun'
                />
                ))
              }

              </Dropdown.Menu>
            </Dropdown>
        )
    }

export default Request
