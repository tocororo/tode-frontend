import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocument } from '../../actions/DocumentAction'
import { getUsers  } from '../../actions/UserAction'
import { getPermisions } from '../../actions/PermisionAction'
import { newPermision } from '../../actions/PermisionAction'
import {getUserAuth} from '../../actions/AuthAction'
import { Accordion, Icon, Form, Radio, Button, Image, Modal,Table, List, Popup, Divider, Label, Message} from 'semantic-ui-react'
import { faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment  from 'react-moment'
import Avatar from '../../assets/Avatar.png'
import '../../css/DocumentsPage.css'
import styled from 'styled-components'

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
    state = { 
      activeIndex: 0,
      open: false,
      document:"",
      document_user:"",
      doc:[],
      permision: []
     }

  showModal = () => {
      this.setState({ open: true })
  }

  closeModal = () => this.setState({ open: false })

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  async componentDidMount() {

    fetch('/document').then(res => res.json()).then((data) => {
      this.setState({doc:data.docs, permision:data.perms})
      console.log(data.docs);
            
     })
     .catch(console.log);
    this.props.getUsers(); 
    this.props.getDocument_version();
  }


  OnChange = (e, { doc,user }) => this.setState({ document:doc, document_user:user })


OnSubmit = (e) => {
    e.preventDefault();

        const {document_user, document} = this.state;
        const newPermision = { document_user, document };
        this.props.newPermision(newPermision);
        
        
}

    render() {
        const { activeIndex } = this.state
        const { users } = this.props.user
        const { docs_version } = this.props.doc_version
        const { doc_count } = this.props.doc        
        const { version_count } = this.props.doc_version
        const { open } = this.state
        const { user } = this.props.auth

        const docs = this.state.doc
        const perms = this.state.permision

      return (
      < div >          
          {
             docs.map(doc => (  
              perms.map(perm => (
                doc._id === perm.document._id && user._id === perm.document_user._id ? 

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
                     {<Moment fromNow>{doc.createdAt}</Moment> !== "a few seconds ago" && 
                        user._id != doc.document_user._id
                        ? 
                        <Table.HeaderCell><Icon name='dropdown'><Label>{version_count}</Label></Icon></Table.HeaderCell>
                        : 
                        <Moment fromNow>{doc.createdAt}</Moment> !== "a few seconds ago" && 
                          user._id != doc.document_user._id
                          ?
                          <Table.HeaderCell><Icon name='dropdown'><Label>{version_count}</Label></Icon></Table.HeaderCell>
                          :
                          <Table.HeaderCell><Icon name='dropdown'/></Table.HeaderCell>
                        }
                        <Table.HeaderCell>{doc.name}</Table.HeaderCell>
                        <Table.HeaderCell>
                          <MyLink to={"/view_document/" + doc._id}>{doc.coment}</MyLink>
                        </Table.HeaderCell>
                        <Table.HeaderCell>{doc.document_user.name}</Table.HeaderCell>
                        <Table.HeaderCell>{doc.document_user.rol}</Table.HeaderCell>
                        <Table.HeaderCell><Moment fromNow>{doc.createdAt}</Moment></Table.HeaderCell>
                        <Table.HeaderCell>
                          <MyLink to={"/edit_document/"+doc._id}>
                                  <FontAwesomeIcon icon={faEdit} />
                          </MyLink>
                        </Table.HeaderCell>
                        <Table.HeaderCell>

                          {/**
                           MODAL FOR ADD USER PERMISION 
                          */}
                          <MyLink to = "#">
                                  <FontAwesomeIcon icon={faUserPlus} onClick={this.showModal}/>
                          </MyLink>
                          <Modal  className="card-login"  open={open}  onClose={this.closeModal}>
                            <Modal.Header>Otorgar Permisos al Documento a:</Modal.Header>
                              <Modal.Content scrolling>                                
                              { users.map(usuario => (
                                    user._id != usuario._id ?
                                <Form onSubmit={this.OnSubmit}>
                                    <Form.Field>
                                    <List >
                                      <List.Item>
                                        <List.Content floated='right'>
                                        <Popup
                                          trigger={
                                          <Button 
                                          doc = {doc._id}
                                          user = {usuario._id}
                                          onClick = {this.OnChange}
                                          type='submit'
                                          icon='add' />}
                                          content="Otorgar permisios a este usuario"
                                          basic
                                        />
                                        </List.Content>
                                        <Image avatar src= {Avatar} />
                                        <List.Content>{usuario.name}</List.Content>
                                      </List.Item>
                                      <Divider/>
                                      </List>
                                    </Form.Field>
                                </Form>
                                :"" ))}
                             </Modal.Content>                               
                           </Modal>
                        </Table.HeaderCell>
                      </Table.Row>  
                    </Table.Header>     
                  </MyTable>
                </Accordion.Title>

                 {/**
                  ACCORDION FOR DOCUMENTS VERSIONS 
                 */}
                <Accordion.Content active={activeIndex === doc._id}>
                   {docs_version.map(doc_version => (
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
                                            : ""))}
                    </Accordion.Content>
                  </Accordion>
                  :""
              ))
            ))}
            
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    doc: state.doc,
    count: state.count,
    user: state.user,    
    auth: state.auth,
    permision: state.permision
})

export default connect(mapStateToProps, { getDocument_version, getDocument, getUsers,newPermision,getPermisions, getUserAuth }) (withRouter(Documentos))