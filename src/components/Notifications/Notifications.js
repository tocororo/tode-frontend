import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Icon, Dropdown, Message, Modal, Button, Header} from 'semantic-ui-react'
import { getNotificationDocVersion, getNotificationForPermisions, deleteNotification} from '../../actions/NotificationAction'
import MessagesForVersions from './MessagesForVersions'
import styled from 'styled-components'


const MyIcon = styled(Icon)`
  &&& {
   color: grey;

   &&&:hover{
    color: #1d314d;
  }
`
function Notifications(props)  { 

  const [modalOpen, setModalOpen] =useState(false)

  const {notifications} = useSelector(state => state.notification);
  const  user  = useSelector(state => state.auth.user); 
  
  const dispatch = useDispatch()

  const handleOpen = () => setModalOpen(true) ;

  const OnCancel = (e, {id}) => {
    dispatch(deleteNotification({id}))
    setModalOpen(false);    
  }

  const NotificationCheckedForVersion = (e, { document, document_version }) => {
    dispatch(getNotificationDocVersion({document, document_version}) );
  }

  const NotificationCheckedForPermision = (e, { document }) => {
    dispatch(getNotificationForPermisions({document}) );
    setModalOpen(false)
  }

  const trigger =  (
    <span>
      <MyIcon name='bell' size='big' /> 
    </span>
  )

        return (
            <div>
                <Dropdown trigger={trigger}  pointing='top right'  icon={null}> 
                <Dropdown.Menu >
                {
                notifications.map(notify => (

                // NOTIFICACIONS FOR VERSIONS
                user && notify.toUser === user._id  ?                  
                <Dropdown.Item active key={notify._id}
                    document = {notify.document._id}
                    document_version = {notify.document_version._id}                
                    onClick={NotificationCheckedForVersion}>

                  <MessagesForVersions 
                    notification={notify.notification} 
                    name={notify.document.name} 
                    date={notify.createdAt}  
                    notificationSied={notify.notificationSied}/>
                </Dropdown.Item>
                :

                // NOTIFICACIONS FOR PERMISIONS
                user && notify.forPermisions === user._id ?
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
                : null
                ))
              }

              </Dropdown.Menu>
            </Dropdown>
            <label className='label' ><strong>{props.count}</strong></label>
            </div>
        )
    }

export default Notifications
