import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocument,  } from '../../actions/DocumentAction'
import { Accordion, Icon } from 'semantic-ui-react'


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

                        <Accordion fluid styled>
                            <Accordion.Title
                              active={activeIndex === doc._id}
                              index={doc._id}
                              onClick={this.handleClick}
                            >
                              
                              <table className="table table-active table-borderless">
                                 <tr>
                                     <th scope="col"> <Icon name='dropdown' /> </th>
                                     <th scope="col"> {doc.name} </th>
                                     <th scope="col"> <Link to={"/edit_document/" + doc._id}>{doc.coment}</Link></th>
                                     <th scope="col"> {doc.createdAt} </th>
                                     <th scope="col"> {doc.createdAt} </th>
                                 </tr>
                              </table>
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === doc._id}>

                                    {docs_version.map(doc_version => (
                                        doc._id === doc_version.document._id ?
                                            <table className="table table-borderless">
                                                <tr>
                                                    <th scope="col">{doc_version.document.name}</th>
                                                    <th scope="col">{doc_version.coment}</th>
                                                    <th scope="col">{doc_version.document_user.name}</th>
                                                    <th scope="col">{doc_version.createdAt}</th>
                                                    </tr>

                                            </table>
                                            : ""))}
                    </Accordion.Content>
                  </Accordion>

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