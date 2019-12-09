import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDocument, newDocument } from '../../actions/DocumentAction'
import { TextArea,Button, Form, Input } from 'semantic-ui-react';

class NewDocument extends Component {
    state = {
        _id: "",
        name: "",
        coment: "",
        document_user: "",
        editing: false
    }

    static propTypes = {
        newDocument: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    OnChange = e => {


        this.setState({ [e.target.name]: e.target.value,});
        const { user } = this.props.auth
        user ? this.setState({ document_user: user._id }) : this.setState({ document_user: "" })

    };

    OnSubmit = (e) => {
        e.preventDefault();
        const { name, coment, document_user } = this.state;
        const newDoc = { name, coment, document_user };
        this.props.newDocument(newDoc);
        this.props.history.push('/document');
    }

    render() {
        return (

            <Form onSubmit={this.OnSubmit}>
                <Form.Field>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Nombre del documento"
                        name="name"
                        onChange={this.OnChange}
                        required                     
                    />
                </Form.Field>
                <Form.Field>
                    <TextArea
                        style={{ minHeight: 100}}
                        type="text"
                        id="coment"
                        placeholder="Comentario sobre el documento"
                        name="coment"
                        onChange={this.OnChange}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <Button type="submit"> Guardar </Button>
                </Form.Field>
            </Form>

        )
    }
}

NewDocument.propTypes = {
    newDocument: PropTypes.func.isRequired,
    getDocument: PropTypes.func.isRequired,
    doc: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    doc: state.doc,
    auth: state.auth
})

export default connect(mapStateToProps, { newDocument, getDocument }) (withRouter(NewDocument))