import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocument,  } from '../../actions/DocumentAction'
import { Accordion, Icon } from 'semantic-ui-react'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Documentos extends Component {
    state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  async componentDidMount() {

    this.props.getDocument();
    this.props.getDocument_version();
}

    render() {
        const { activeIndex } = this.state
        const { docs } = this.props.doc
        const { docs_version } = this.props.doc_version
        return (

            < div >
                {
                    docs.map(doc => (
                        doc ?
                        <Accordion fluid styled key={doc._id}>
                            <Accordion.Title
                              active={activeIndex === doc._id}
                              index={doc._id}
                              onClick={this.handleClick}
                            >
                              
                              <table className="table table-active table-borderless">
                                  <tbody>
                                 <tr>
                                     <th scope="col"> <Icon name='dropdown' /> </th>
                                     <th scope="col"> {doc.name} </th>
                                     <th scope="col"> <Link to={"/view_document/" + doc._id}>{doc.coment}</Link></th>
                                     <th scope="col"> {doc.document_user.name} </th>                                     
                                     <th scope="col"> {doc.document_user.rol} </th>
                                     <th scope="col"> {doc.createdAt} </th>
                                     <th><Link className="btn btn-warning" to={"/edit_document/" + doc._id}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link></th>
                                 </tr>
                                 </tbody>
                              </table>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === doc._id}>

                                    {docs_version.map(doc_version => (
                                        doc._id === doc_version.document._id ?
                                            <table className="table table-borderless" key={doc_version._id}>
                                                <tbody>
                                                <tr >
                                                    <th scope="col">{doc_version.document.name}</th>
                                                    <th scope="col"><Link to={"/view_document_version/" + doc_version._id}>{doc_version.coment}</Link></th>
                                                    <th scope="col">{doc_version.document_user.name}</th>
                                                    <th scope="col">{doc_version.document_user.rol}</th>
                                                    <th scope="col">{doc_version.createdAt}</th>
                                                    <th><Link className="btn btn-warning" to={"/edit_document_version/" + doc_version._id}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link></th>
                                                    </tr>
                                                    </tbody>
                                            </table>
                                            : ""))}
                    </Accordion.Content>
                  </Accordion>

                   :
                   <table className="table table-active table-borderless">
                                  <tbody>
                                 <tr>
                                     <th></th>
                                 </tr>
                                 </tbody>
                                 </table>
                                  ))
                }
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    doc: state.doc
})

export default connect(mapStateToProps, { getDocument_version, getDocument })(Documentos)