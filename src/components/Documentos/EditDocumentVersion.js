import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { newDocument_version } from '../../actions/DocumentVersionAction'
import axios from 'axios'
import { TextArea, Button, Form } from 'semantic-ui-react';

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
            const res = await axios.get(`/document_version_content/${this.props.match.params.id}`)
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
        this.props.newDocument_version(newDoc, this.props.history);
    }

    render() {
        return (

            <Form onSubmit={this.OnSubmit}>
                <Form.Field>

                    <TextArea
                        style={{ minHeight: 100}}
                        type="text"
                        id="coment"
                        name="coment"
                        onChange={this.OnChange}
                        value={this.state.coment}
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

EditDocumentVersion.propTypes = {
    newDocument_version: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    auth: state.auth
})

export default connect(mapStateToProps, { newDocument_version }) (withRouter(EditDocumentVersion))