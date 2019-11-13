import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class MessagesContainer extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { user } = this.props.auth
        return (
            <Comment.Group>

                {this.props.messages.map((message, index) => {
                    return (
                        <Comment key={"c" + index}>
                            <Comment.Author as="b">{user ? `${user.name}` : 'user'}</Comment.Author>
                            <Comment.Text>{message.content}</Comment.Text>
                        </Comment>
                    );
                })}

            </Comment.Group>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(MessagesContainer);