import React, {Fragment,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Icon, Dropdown, Message, Label } from 'semantic-ui-react'
import { getNotificationDocVersion} from '../../actions/NotificationAction'
import MessagesForVersions from './MessagesForVersions'
import Moment  from 'react-moment'
import styled from 'styled-components'


const MyIcon = styled(Icon)`
  &&& {
   color: grey;

   &&&:hover{
    color: white;
  }
`
function Notifications(props)  { 

  const {notifications} = useSelector(state => state.notification);
  // const {users, isAuthenticated} = useSelector(state => state.auth); 
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  
  const dispatch = useDispatch()

  const NotificationCheckedForVersion = (e, { document, document_version }) => {
    dispatch(getNotificationDocVersion({document, document_version}) );

  }

  const trigger =  (
    <Fragment>
        <MyIcon name='bell' size='big' /> 
        {
        props.count !== 0 ?
        <Label color='red' size='mini' floating ><strong>{props.count}</strong></Label>
        : null
        }
      </Fragment>
  )

        return (
            <div>
                <Dropdown trigger={trigger}  pointing='top right'  icon={null}> 
                <Dropdown.Menu >
                {
                notifications.map(notify => (

                // NOTIFICACIONS FOR VERSIONS
                oauth2IsAuthenticated && notify.toUser && notify.toUser._id === oauth2Users._id  ?                  
                <Dropdown.Item active = {notify.notificationSied === false ? true : false }
                    document = {notify.document._id}
                    document_version = {notify.document_version._id}       
                    onClick={NotificationCheckedForVersion} 
                    content= {notify.notification}
                    description = {<Moment>{notify.createdAt}</Moment>}
                    />

                  /* <MessagesForVersions 
                    notification={notify.notification} 
                    name={notify.document.name} 
                    date={notify.createdAt}  
                    notificationSied={notify.notificationSied}/>
                </Dropdown.Item>
                : 
                <Message
                  key={notify._id}
                  size='small'
                  color='grey'
                  header='Sin notificaciones aun'
                /> */
                :
                <Dropdown.Header 
                content='Sin notificaciones aun'
                />
                ))
              }

              </Dropdown.Menu>
            </Dropdown>
            
            </div>
        )
    }

export default Notifications
