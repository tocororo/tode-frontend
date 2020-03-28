import React from 'react'
import {Message} from 'semantic-ui-react'
import Moment  from 'react-moment'

function MessagesForVersions(props) {
  
        return (
          props.notificationSied === false ?
            <Message
                  size='small'
                  color='blue'
                  header={props.notification}
                  content={<Moment>{props.date}</Moment>}
                />
          :
            <Message
                  size='small'
                  color='grey'
                  header={props.notification}
                  content={<Moment>{props.date}</Moment>}
                />
        )
    }

export default MessagesForVersions