import React, {Fragment, useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Accordion, Icon, Container, Pagination, Grid, Header, Segment, Transition, Dimmer, Loader, Divider, Popup} from 'semantic-ui-react'
import Moment  from 'react-moment'
import '../../css/DocumentsPage.css'
import styled from 'styled-components'

import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocuments } from '../../actions/DocumentAction'
import {cancelPermisionShared} from '../../actions/PermisionAction'
import Confirm from '../Notifications/Confirm';
import { ChatContext } from '../contexts/ChatContext';

const MyAccordion = styled(Accordion)`
  &&&{
    padding: 0;
    margin: 0;
  }
`

const MyGrid = styled(Grid)`
  &&&{
    padding: 0;
    margin: 0;
  }
`

function DocumentsShared () {
  /* creando variables de estado y un metodo para modificarlas */
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [showDocuments, setShowDocuments] = useState(false);
  const [currentPage, SetCurrentPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(5);

  /* utilizando variables de los reducers.js */
  const {docs_version, lastShared} = useSelector(state => state.doc_version);
  const {docs, permsShared} = useSelector(state => state.doc);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2);

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()
  const {showIcon} = useContext(ChatContext)  
  
  let permisos = new Array()
  for (let i = 0; i < permsShared.length; i++) {
   if (permsShared[i]) {
     permisos.push(permsShared[i])
   }   
  }

  let lastSharedVersions = new Array()
  for (let i = 0; i < lastShared.length; i++) {
   if (lastShared[i]) {
    lastSharedVersions.push(lastShared[i])
   }   
  }

  let indexOfLastPermision = currentPage * documentsPerPage;
  let indexOfFirstPermision = indexOfLastPermision - documentsPerPage;
  let currentPermisions = permisos.slice(indexOfFirstPermision, indexOfLastPermision);
  let totalPages = Math.ceil(permisos.length / documentsPerPage) 

  const handlePaginationChange =  (e, activePage  ) => {
    SetCurrentPage( activePage.activePage );
    indexOfLastPermision = currentPage * documentsPerPage;
    indexOfFirstPermision = indexOfLastPermision - documentsPerPage;
    currentPermisions = permisos.slice(indexOfFirstPermision, indexOfLastPermision);
  }

  const handleLoader = () => {
    setTimeout(() =>{
      setShowLoader(false)
      setShowDocuments(true)
    },2000)
  }

  // useeffect for componentDidMount, ComponentDidUpdate, componentWillUnmount  
  useEffect( () =>{
    dispatch(getDocuments());
    dispatch(getDocument_version());
    handleLoader();

    return () => {
      dispatch(getDocuments());
      dispatch(getDocument_version());
    }
  },[])

  /* funcion para manejar la apertura y cierre del MyAccordion */
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex )    
  }

  const cancelPermision = (e, document) => {
    dispatch(cancelPermisionShared(document.id));
  }  


  return (
    currentPermisions.length > 0  ?
     <Container>       
     <Transition  animation='fade' duration={100} visible={showLoader}>
       <Transition.Group as={Container}>                    
         <Dimmer active={showLoader}>
           <Loader size='massive'>Loading</Loader>
         </Dimmer>
       </Transition.Group>
      </Transition>
   
      <Transition animation='fade' duration={100} visible={showDocuments}>
      <Transition.Group as={Container}>
        <MyGrid columns={6} columns='equal' divided>
          <MyGrid.Row>
            <h2>Biblioteca Compartida</h2>
          </MyGrid.Row>
          <MyGrid.Row>
            <MyGrid.Column>
              Articulo
            </MyGrid.Column>
            <MyGrid.Column>
              Comentario
            </MyGrid.Column>
            <MyGrid.Column>
              Usuario
            </MyGrid.Column>
            <MyGrid.Column>
              Fecha
            </MyGrid.Column>
            <MyGrid.Column>
              Opciones
            </MyGrid.Column>
          </MyGrid.Row> 
          <div style={{overflowY:'scroll', maxHeight:400}}>
          {
        //docs.map(doc =>  
        currentPermisions.map(perm => 
          /*  oauth2IsAuthenticated && oauth2Users._id === perm.withPermisions._id && oauth2Users._id !== perm.document.document_user && perm.requestAcepted === true && perm.document._id === doc._id ?   */
          
            /**
            MyAccordion FOR MAIN DOCUMENT
             */
        <Fragment key={perm._id}>
        <MyGrid.Row >
          <MyAccordion fluid styled >
             <MyAccordion.Title
               active={activeIndex === perm._id}
               index={perm._id}
               onClick={handleClick}
             >
             {lastSharedVersions.map(last_version => 
              //last_version && perm.document._id === last_version.document._id ?
                <MyGrid columns={6} columns='equal' divided key={last_version._id}>
                  <MyGrid.Row color='blue'>
                      <MyGrid.Column><Icon name='dropdown'/>{perm.document.name}</MyGrid.Column>
                      <MyGrid.Column>{last_version.coment}</MyGrid.Column>
                      <MyGrid.Column>{last_version.document_user.name}</MyGrid.Column>
                      <MyGrid.Column>
                        <Moment fromNow>{last_version.document.createdAt}</Moment></MyGrid.Column>
                      <MyGrid.Column> 
                        <Popup
                          size='tiny'
                          content='Editar Documento'
                          trigger={ 
                            <Icon.Group  size='large' onClick={showIcon}>
                            <Link to = {"/edit_document_version/" + last_version._id}>
                              <Icon name='edit' color='red' circular  size='small' inverted/>
                            </Link> 
                          </Icon.Group>}
                        />
                        <Popup
                          size='tiny'
                          content='Abandonar Documento'
                          trigger={ 
                            <Icon.Group id = {perm.document._id} size='large' onClick={cancelPermisionShared}>
                              <Icon name='minus circle' color='red' circular  size='small' inverted/>
                          </Icon.Group>}
                        />
                      </MyGrid.Column>
                  </MyGrid.Row>  
                </MyGrid>   
             // :null
            )}
            </MyAccordion.Title>

            {/**
             MyAccordion FOR DOCUMENTS VERSIONS 
            */}
            <MyAccordion.Content active={activeIndex === perm._id}>
              {docs_version.length > 0 ?
                docs_version.map(doc_version => 
                docs_version && perm.document._id === doc_version.document._id ?
                  <Fragment key={doc_version._id}>
                    <MyGrid columns={6} columns='equal' celled>
                      <MyGrid.Row color='teal'>
                         <MyGrid.Column>{doc_version.document.name}</MyGrid.Column>
                         <MyGrid.Column>{doc_version.coment}</MyGrid.Column>
                         <MyGrid.Column>{doc_version.document_user.name}</MyGrid.Column>
                         <MyGrid.Column><Moment fromNow>{doc_version.createdAt}</Moment></MyGrid.Column>
                         <MyGrid.Column>
                          <Icon.Group size='large'>
                          <Icon name='eye' color='red' size='small' circular inverted/>
                          </Icon.Group>
                          <Icon.Group size='large'>
                          <Link to = {"/edit_document_version/" + doc_version._id}>
                          <Icon name='edit' color='red' size='small' circular inverted/>
                          </Link>
                          </Icon.Group>
                         </MyGrid.Column>
                       </MyGrid.Row>
                    </MyGrid>
                   </Fragment>
              : null)
            :null}
            </MyAccordion.Content>
          </MyAccordion>
          </MyGrid.Row>
          <Divider hidden />
          </Fragment>
             // :null
             ) 
         // )
              }
          </div>
          </MyGrid>  

          <Confirm />

        </Transition.Group>
        </Transition> 
        <Pagination
        activePage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePaginationChange}
      />
        </Container>
        : 
        <div style={{marginTop:100}}>
        <Segment placeholder>
          <Header as='h2' icon textAlign='center'>
            <Icon name='file pdf outline' size='big' />
            <Header.Content> Ups lo sentimos</Header.Content>
            <Header.Content>Aun no se ha compartido un artículo contigo</Header.Content>
          </Header>
        </Segment>
        </div>
      )
    }

export default DocumentsShared