import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { Button, Form, FormGroup } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { newDocument_version } from '../../actions/DocumentVersionAction'
import axios from 'axios'
import { TextArea } from 'semantic-ui-react';

class EditDocumentVersion extends Component {
    state = {
        _id: "",
        coment: "",
        document: "",
        document_user: "",
        editing: false
    }

    static propTypes = {
        newDocument_version: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }
    async componentDidMount() {
        if (this.props.match.params.id) {
            const res = await axios.get(`/document_version/${this.props.match.params.id}`)
            this.setState({
                editing: true,
                coment: res.data.coment,
                document: res.data.document,
                document_user: res.data.document_user
            })

        }
    }

    OnChange = e => {


        this.setState({ [e.target.name]: e.target.value, });
        const { user } = this.props.auth
        user ? this.setState({ document_user: user._id }) : this.setState({ document_user: "" })

    };

    OnSubmit = (e) => {
        e.preventDefault();

        const { coment, document_user, document } = this.state;
        const newDoc = { coment, document_user, document };
        this.props.newDocument_version(newDoc);
        this.props.history.push('/document');


    }

    render() {
        return (

            <Form onSubmit={this.OnSubmit}>
                <FormGroup>

                    <TextArea
                        type="text"
                        id="coment"
                        className=" form-control"
                        placeholder="Comentario sobre el documento"
                        name="coment"
                        onChange={this.OnChange}
                        value={this.state.coment}
                        required
                    />

                    <Button type="submit"> Crear </Button>
                </FormGroup>
            </Form>

        )
    }
}

EditDocumentVersion.propTypes = {
    newDocument_version: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    auth: state.auth
})

export default connect(mapStateToProps, { newDocument_version }) (withRouter(EditDocumentVersion))