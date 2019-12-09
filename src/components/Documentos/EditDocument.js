import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { Button, Form, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { newDocument_version } from '../../actions/DocumentVersionAction'
import axios from 'axios'

class EditDocument extends Component {
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
            const res = await axios.get(`/document/${this.props.match.params.id}`)
            this.setState({
                editing: true,
                _id: this.props.match.params.id,
                coment: res.data.coment,
                document: this.props.match.params.id,
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

EditDocument.propTypes = {
    newDocument_version: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    auth: state.auth
})

export default connect(mapStateToProps, { newDocument_version }) (withRouter(EditDocument))