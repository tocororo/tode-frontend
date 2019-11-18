import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDocument, newDocument,getDocumentById } from '../../actions/DocumentAction'
import { Link } from 'react-router-dom'

class NewDocument extends Component {        
        state = {
            name: "",
            document_user: "",
        }
   componentDidMount(){
       this.props.getDocument()
       
       
   }
    static propTypes = {
        getDocumentById: PropTypes.func.isRequired,
        getDocument: PropTypes.func.isRequired
    }

    
    

    render() {
        const{docs}=this.props.doc
        return (
            
                       <table className="table">
                    <thead className="thead-light">
                    {docs.map(doc => (  
                        doc._id === this.props.match.params.id ?
                        <tr key={doc._id}>
                            <th scope="col">{doc.name} </th>
                            <th scope="col">{doc.coment} </th>
                            <th scope="col">{doc.updatedAt}</th>
                            <th><Link className="btn btn-info"  to={`/edit_document/${doc._id}`}>editar</Link></th>                            
                        </tr>   
                        : ""                        
                        ))}   
                        </thead>

                        
                </table>

           
        )
    }
}

NewDocument.propTypes = {
    getDocumentById: PropTypes.func.isRequired,
    getDocument: PropTypes.func.isRequired,
    doc: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    doc: state.doc,
})

export default connect(mapStateToProps, {getDocument,getDocumentById})(NewDocument)