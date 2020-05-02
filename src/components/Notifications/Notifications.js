import React, {Fragment,} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Icon, Dropdown, Label } from 'semantic-ui-react'
import { getNotificationDocVersion} from '../../actions/NotificationAction'
import Moment  from 'react-moment'
import styled from 'styled-components'
import '../../css/notifications.css'


const MyIcon = styled(Icon)`
  &&& {
   color: white;

   &&&:hover{
    color: grey;
  }
`
function Notifications(props)  { 

  const {notifications} = useSelector(state => state.notification);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  
  const dispatch = useDispatch()

  const NotificationCheckedForVersion = (e, { document, document_version }) => {
    dispatch(getNotificationDocVersion(document, document_version) );
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

  var notificaciones = new Array()
  notifications.forEach((notify, index) => {
    if(oauth2IsAuthenticated && notify.toUser && notify.toUser._id === oauth2Users._id) {
      notificaciones[index] = notify
    }
  });

        return (
            <div>
                <Dropdown trigger={trigger}  pointing='top right'  icon={null}> 
                <Dropdown.Menu >
                {
                  notificaciones.length > 0 ?
                  notificaciones.map(notify => (

                // NOTIFICACIONS FOR VERSIONS
               /*  oauth2IsAuthenticated && notify.toUser && notify.toUser._id === oauth2Users._id  ?      */             
                <Dropdown.Item key={notify._id} 
                    document = {notify.document._id}
                    document_version = {notify.document_version}       
                    onClick={NotificationCheckedForVersion} 
                    content= {
                      notify.notificationSied === false ?
                      <Fragment>
                        <div className="message">
                        <Icon name='circle' color="blue"/>{notify.notification} 
                        </div>
                        <br/>
                        <span className="name">{notify.document.name}</span>
                        <br/>
                        <Moment className="date" fromNow>{notify.createdAt}</Moment>
                      </Fragment>  
                      : 
                      <Fragment>
                        <div className="message">
                        {notify.notification} 
                        </div>
                        <br/>
                        <span className="name">{notify.document.name}</span>
                        <br/>
                        <Moment className="date" fromNow>{notify.createdAt}</Moment>
                      </Fragment>
                    }
                    />
                ))
                :
                <Dropdown.Header 
                content='Sin notificaciones aun'
                />
              }

              </Dropdown.Menu>
            </Dropdown>
            
            </div>
        )
    }

export default Notifications
