import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDocument } from '../../actions/DocumentAction'
import { Link } from 'react-router-dom'



class OriginalDocument extends Component {
    state = {

    }

    async componentDidMount() {
        this.props.getDocument();

    }


    render() {
        const { docs } = this.props.doc

        return (
            <table className="table">

                {docs.map(doc => (
                    <tr key={doc._id}>
                        <th scope="col">{doc.name}</th>
                        <th scope="col">{doc.coment}</th>
                        <th scope="col">{doc.createdAt}</th>
                        <th><Link className="btn btn-info" to={`/edit_document/${doc._id}`}>editar</Link></th>
                    </tr>

                ))}
            </table>
        )
    }
}



const mapStateToProps = (state) => ({
    doc: state.doc
})

export default connect(mapStateToProps, { getDocument })(OriginalDocument)