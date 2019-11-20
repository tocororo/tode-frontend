import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
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
        auth: PropTypes.object.isRequired
    }

    render() {

        const { user } = this.props.auth
        return (
            <Form className="input" onSubmit={this.handleSubmit}>

                <Form.Input
                    placeholder="Escribe aqui..."
                    value={this.state.content}
                    onChange={(e) => { user ? this.setState({ content: e.target.value, sender: user.name }) : this.setState({ content: "", sender: "" }) }}
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
    auth: state.auth
});

export default connect(mapStateToProps, null)(InputContainer);