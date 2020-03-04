import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import '../../css/ChatPage.css'


import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class InputContainer extends Component {

    constructor(props) {

        super(props);
        this.state = {
            sender: "",
            content: ""
        }
    }

    static propTypes = {
        oauth2: PropTypes.object.isRequired
    }

    render() {

        const { oauth2Users, oauth2IsAuthenticated } = this.props.oauth2
        return (
            <Form className="input" onSubmit={this.handleSubmit}>

                <Form.Input
                    placeholder="Escribe aqui..."
                    value={this.state.content}
                    onChange={(e) => { oauth2IsAuthenticated ? this.setState({ content: e.target.value, sender: oauth2Users.name }) : this.setState({ content: "", sender: "" }) }}
                    required
                />
            </Form>
        )
    }

    handleSubmit = () => {

        this.props.handleSubmit(this.state.sender, this.state.content);
        this.setState({
            sender: "",
            content: ""
        });
    }

}



const mapStateToProps = state => ({
    oauth2: state.oauth2
});

export default connect(mapStateToProps, null)(InputContainer);