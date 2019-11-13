import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import axios from 'axios'
import uuid from 'uuid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDocuments, getDocument } from '../actions/DocumentAction'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DocumentServer extends Component {
    state = {
        autor: ""
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getDocuments();

        console.log(this.props.doc.docs);

    }

    listarDocs = () => {
        const { docs } = this.props.doc;
        const nameDocs = new Array(docs.lengt);

        for (let i = 0; i < docs.length; i++) {

            let element = docs[i].split("\\");

            let docHtml = element[element.length - 1].split('.')

            if (element[element.length - 1] !== "manifest.xml") {
                if (docHtml[docHtml.length - 1] === "html") {
                    nameDocs[i] = (
                        <tr>
                            <td key={uuid()} >{docHtml[0]}    </td>
                            <td>
                                <Link className="btn btn-warning" to={"/edit_user/"}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <Link className="btn btn-danger" to="/users" >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Link>
                            </td>
                        </tr>
                    )
                }
            }
        }

        return nameDocs
    }

    render() {

        return (
            <div>
                <table className="table">

                    <tbody>

                        {this.listarDocs()}

                    </tbody>
                </table>

            </div>
        )
    }
}

DocumentServer.propTypes = {
    getDocuments: PropTypes.func.isRequired,
    getDocument: PropTypes.func.isRequired,
    doc: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    doc: state.doc,
    auth: state.auth
})




export default connect(mapStateToProps, { getDocuments, getDocument })(DocumentServer)