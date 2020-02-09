import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Icon, Dropdown, Message } from 'semantic-ui-react'
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

  const {notifications} = useSelector(state => state.notification);
  const  user  = useSelector(state => state.auth.user); 
  
  const dispatch = useDispatch()

  const NotificationCheckedForVersion = (e, { document, document_version }) => {
    dispatch(getNotificationDocVersion({document, document_version}) );
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
                <Message
                  size='small'
                  color='grey'
                  header='Sin notificaciones aun'
                />
                ))
              }

              </Dropdown.Menu>
            </Dropdown>
            <label className='label' ><strong>{props.count}</strong></label>
            </div>
        )
    }

export default Notifications
