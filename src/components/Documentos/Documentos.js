import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocuments } from '../../actions/DocumentAction'
import { newPermision } from '../../actions/PermisionAction'
import { Accordion, Icon, Table, Container, Divider} from 'semantic-ui-react'
import { faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment  from 'react-moment'
import '../../css/DocumentsPage.css'
import styled from 'styled-components'
import Notifications from '../Notifications/Notifications'
import {getNotifications, getNotificationsNumber} from '../../actions/NotificationAction'

const MyTable = styled(Table)`
  &&& {
    background-color:#1d314d;
  }
`
const MyLink = styled(Link)`
  &&& {
    color:red;
  }
`

class Documentos extends Component {
  constructor(props){
    super(props)
    this.state = { 
      activeIndex: 0,
      countNotifications: "" 
    }
  }


  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  async componentWillMount(){
    /* this.props.getNotifications()
    const { notifications } = this.props.notification
    notifications.map(notify => (
      notify.notificationSied === false ?
      this.setState({countNotifications: this.state.countNotifications + 1})
      : 
      this.setState({countNotifications: ""})
    )) */
    this.props.getNotifications()
    this.props.getNotificationsNumber();
  }

  async componentDidMount() {
    this.props.getDocuments()
    this.props.getDocument_version();    
  }

    render() {
        const { activeIndex } = this.state
        const { docs_version } = this.props.doc_version
        const { user } = this.props.auth
        const {docs, perms} = this.props.doc

      return (
        <div>
           
        <div className='notificationContainer' >   
          <Notifications onClick={this.handleNotifications} countNotifications={this.state.countNotifications}/>
          
        </div> 

        <Divider />

        <Container>       
          {
             docs.map(doc =>   
              perms.map(perm => 
                user && doc._id === perm.document._id && user._id === perm.document_user._id ? 

               /**
               ACCORDION FOR MAIN DOCUMENT
                */
             <Accordion fluid styled key={doc._id}>
                <Accordion.Title
                  active={activeIndex === doc._id}
                  index={doc._id}
                  onClick={this.handleClick}
                >
                  <MyTable padded='very' inverted>
                    <Table.Header>
                     <Table.Row>
                        <Table.HeaderCell><Icon name='dropdown'/></Table.HeaderCell>
                        <Table.HeaderCell>{doc.name}</Table.HeaderCell>
                        <Table.HeaderCell>
                          <MyLink to={"/view_document/" + doc._id}>{doc.coment}</MyLink>
                        </Table.HeaderCell>
                        <Table.HeaderCell>{doc.document_user.name}</Table.HeaderCell>
                        <Table.HeaderCell>{doc.document_user.rol}</Table.HeaderCell>
                        <Table.HeaderCell><Moment fromNow>{doc.createdAt}</Moment></Table.HeaderCell>
                        <Table.HeaderCell>

                          {/**
                           MODAL FOR ADD USER PERMISION 
                          */}
                          <MyLink to = {"/permisions/" + doc._id}>
                                  <FontAwesomeIcon icon={faUserPlus} />
                          </MyLink>
                          
                        </Table.HeaderCell>
                      </Table.Row>  
                    </Table.Header>     
                  </MyTable>
                </Accordion.Title>

                 {/**
                  ACCORDION FOR DOCUMENTS VERSIONS 
                 */}
                <Accordion.Content active={activeIndex === doc._id}>
                   {docs_version.map(doc_version => 
                      doc._id === doc_version.document._id ?
                        <Table padded='very' color="blue" key={doc_version._id}>
                          <Table.Header>
                            <Table.Row>
                              <Table.Cell>{doc_version.document.name}</Table.Cell>
                              <Table.Cell>
                                <MyLink to={"/view_document_version/"+doc_version._id}>{doc_version.coment}
                                </MyLink>
                              </Table.Cell>
                              <Table.Cell>{doc_version.coment}</Table.Cell>
                              <Table.Cell>{doc_version.document_user.name}</Table.Cell>
                              <Table.Cell>{doc_version.document_user.rol}</Table.Cell>
                              <Table.Cell><Moment fromNow>{doc_version.createdAt}</Moment></Table.Cell>
                              <Table.Cell>
                                <MyLink className="btn btn-warning" 
                                  to={"/edit_document_version/" + doc_version._id}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </MyLink>
                              </Table.Cell>
                            </Table.Row>
                          </Table.Header>
                        </Table>
                                            : "")}
                    </Accordion.Content>
                  </Accordion>
                  :"")
            )}
            </Container>
            </div>
            
        )
    }
}



const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    doc: state.doc,
    user: state.user,    
    auth: state.auth,
    notification: state.notification
})

export default connect(mapStateToProps, { getDocuments, getDocument_version, newPermision, getNotifications, getNotificationsNumber}) (withRouter(Documentos))