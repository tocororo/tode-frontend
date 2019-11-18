import React,{Component} from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {  getDocument } from '../../actions/DocumentAction'
import '../../css/DocumentsPage.css'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'


class Documentos extends Component {
    state = {
        
    }
    
    async componentDidMount() {
        this.props.getDocument();
        
    }

    render() {
        const {docs} = this.props.doc
        return (
         <div className="documents-container">

           <Link className="btn btn-info"  to='/new_document'>Crear Documnento</Link>            
          
           <table className="table">
                    <thead className="thead-light">
                    {docs.map(doc => (  
                        <tr key={doc._id}>
                            <th scope="col"><Link to={`/view_document/${doc._id}`}>{doc.name}</Link> </th>
                            <th scope="col">{doc.document_user.rol}</th>                            
                        </tr>                 
                    
                        ))}
                        </thead>
                </table>
         </div>
        )
    }
}

Documentos.propTypes = {
    getDocument: PropTypes.func.isRequired,
    doc: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    doc: state.doc
})

export default connect(mapStateToProps,{getDocument})( Documentos)