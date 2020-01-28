import React, { Component } from 'react'
import {Message} from 'semantic-ui-react'
import Moment  from 'react-moment'

class MessagesForVersions extends Component {

  constructor(props){
    super(props)
    this.state = {
      notification: props.notification,
      name: props.name,
      color: props.color,
      date: props.date
    }
}
    render() {
        return (
            <Message
                  size='small'
                  info={this.state.color}
                  header={`${this.state.notification} ${this.state.name}`}
                  content={<Moment>{this.state.date}</Moment>}
                />
        )
    }
}

export default MessagesForVersions