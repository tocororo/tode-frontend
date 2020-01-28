import React, { Component } from 'react'
import {Icon, Dropdown, Message, Label} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {getNotifications, getNotificationDocVersion, getNotificationsNumber} from '../../actions/NotificationAction'
import MessagesForVersions from './MessagesForVersions'
import styled from 'styled-components'
import Moment  from 'react-moment'


const MyIcon = styled(Icon)`
  &&& {
   color: grey;

   &&&:hover{
    color: #1d314d;
  }
`
class Notifications extends Component { 

  NotificationChecked = (e, {document_version, document_user }) => {
    console.log({document_version, document_user });
    this.props.getNotificationDocVersion({document_user, document_version}) ;
    this.props.getNotificationsNumber();
    this.props.getNotifications();
  }
  
    render() {
        const { notifications,notificationsNumber } = this.props.notification 
        const { user } = this.props.auth

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

                notify && user && notify.document_user._id === user._id && notify.notificationSied === false ?

                <Dropdown.Item active key={notify._id}
                document_user = {notify.document_user._id}
                document_version = {notify.document_version._id}                
                onClick={this.NotificationChecked}>

                <MessagesForVersions color='info' notification={notify.notification} name={notify.document.name} date={notify.createdAt}/>
                </Dropdown.Item>
                :
                  user && notify.document_user._id === user._id && notify.notificationSied === true ?
                <Dropdown.Item active key={notify._id}>
                <MessagesForVersions notification={notify.notification} name={notify.document.name} date={notify.createdAt}/>
                </Dropdown.Item>
                : 
                user && notify.document_user._id === user._id && notify.notification === '' ?
                <Dropdown.Item active key={notify._id}>
                <Message
                  size='small'
                  info={this.state.color}
                  header='Sin notificaciones aun'
                  content={<Moment>{this.state.date}</Moment>}
                />
                </Dropdown.Item>
                :null
                ))
                }

                {
                  notifications.map(notify => (
                  user && notify.document_user._id === user._id && notify.notification === '' &&
                  <Dropdown.Item active key={notify._id}>
                  <Message
                    size='small'
                    info={this.state.color}
                    header='Sin notificaciones aun'
                    content={<Moment>{this.state.date}</Moment>}
                  />
                  </Dropdown.Item>
                ))
              }

              </Dropdown.Menu>
            </Dropdown>
            <label className='label' ><strong>{notificationsNumber}</strong></label>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    doc: state.doc,
    user: state.user,    
    auth: state.auth,
    permision: state.permision,
    notification: state.notification
})

export default connect(mapStateToProps, { getNotificationsNumber, getNotificationDocVersion, getNotifications}) (Notifications)
