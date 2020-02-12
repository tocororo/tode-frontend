import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocuments } from '../../actions/DocumentAction'
import { Accordion, Icon, Table, Container, Divider, Segment, Header, Button} from 'semantic-ui-react'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment  from 'react-moment'
import '../../css/DocumentsPage.css'
import styled from 'styled-components'
import Notifications from '../Notifications/Notifications'
import {getNotifications, getNotificationsNumber} from '../../actions/NotificationAction'

/* estilo modificado para table */
const MyTable = styled(Table)`
  &&& {
    background-color:#1d314d;
  }
`
/* estilo modificado para link */
const MyLink = styled(Link)`
  &&& {
    color:red;
  }
`

function DocumentsShared () {
  /* creando variables de estado y un metodo para modificarlas */
  const [activeIndex, setActiveIndex] = useState(0);

  /* utilizando variables de los reducers.js */
  const docs_version = useSelector(state => state.doc_version.docs_version);
  const {docs, perms} = useSelector(state => state.doc);
  const user = useSelector(state => state.auth.user); 
  const {notifications, notificationsNumber} = useSelector(state => state.notification);

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()

  // useeffect for componentDidMount, ComponentDidUpdate, componentWillUnmount  
  useEffect( () =>{
    dispatch(getDocuments());
    dispatch(getDocument_version());
    dispatch(getNotifications());
    dispatch(getNotificationsNumber());
  },[notificationsNumber])

  /* funcion para manejar la apertura y cierre del accordion */
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex )
  }


      return (
        <div>
           
          <div className='notificationContainer' >        
              <h1 className='title'>Bibilioteca Compartida</h1>          
              <Notifications count={notificationsNumber}/>
          </div> 

          <Divider />

          <Container>       
            {
              docs.length !== 0 ?              
            docs.map(doc =>   
             perms.map(perm => 
               user &&  doc._id === perm.document._id &&  user._id === perm.withPermisions._id &&user._id !== perm.document.document_user && perm.requestAcepted === true ? 
               
              /**
              ACCORDION FOR MAIN DOCUMENT
               */
             <Accordion fluid styled key={perm._id}>
                <Accordion.Title
                  active={activeIndex === perm._id}
                  index={perm._id}
                  onClick={handleClick}
                >
                  <MyTable padded='very' inverted>
                    <Table.Header>
                     <Table.Row>
                    <Table.HeaderCell><Icon name='dropdown'/></Table.HeaderCell>
                    <Table.HeaderCell>{perm.document.name}</Table.HeaderCell>
                    <Table.HeaderCell>
                      <MyLink to={"/view_document/" + perm.document._id}>{perm.document.coment}</MyLink>
                    </Table.HeaderCell>
                    <Table.HeaderCell>{doc.document_user.name}</Table.HeaderCell>
                    <Table.HeaderCell>{doc.document_user.rol}</Table.HeaderCell>
                    <Table.HeaderCell><Moment fromNow>{perm.document.createdAt}</Moment></Table.HeaderCell>
                    <Table.HeaderCell>

                      {
                       /**
                       MODAL FOR ADD USER PERMISION 
                      <MyLink to = {"/permisions/" + perm.document._id}>
                              <FontAwesomeIcon icon={faUserPlus} />
                      </MyLink> 
                      */
                      }
                    </Table.HeaderCell>
                  </Table.Row>  
                </Table.Header>     
              </MyTable>
            </Accordion.Title>

             {/**
              ACCORDION FOR DOCUMENTS VERSIONS 
             */}
            <Accordion.Content active={activeIndex === perm._id}>
            {docs_version.map(doc_version => 
              perm.document._id === doc_version.document._id ?
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
          :null
          )
        )
      
        :
            
        <Segment placeholder>
        <Header icon>
          <Icon name='pdf file outline' />
          No existen documentos en la biblioteca.
        </Header>
        <Link className='button'  to='/new_document' >Adicionar Documento</Link>
      </Segment>}
        </Container>
      </div>
            
        )
    }

export default (withRouter(DocumentsShared))