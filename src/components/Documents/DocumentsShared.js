import React, {Fragment, useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom';
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocuments } from '../../actions/DocumentAction'
import { Accordion, Icon, Container, Grid, Header, Segment, Transition, Dimmer, Loader, Divider} from 'semantic-ui-react'
import Moment  from 'react-moment'
import '../../css/DocumentsPage.css'

import DocumentsOptions from './DocumentsOptions'
import Confirm from '../Notifications/Confirm';
import { ChatContext } from '../contexts/ChatContext';
import { log } from 'util';

function DocumentsShared () {
  /* creando variables de estado y un metodo para modificarlas */
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [showDocuments, setShowDocuments] = useState(false);
  const [currentPage, SetCurrentPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(5);

  /* utilizando variables de los reducers.js */
  const {docs_version, lastShared} = useSelector(state => state.doc_version.docs_version);
  const {docs, permsShared} = useSelector(state => state.doc);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2);

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()
  //const {showIcon} = useContext(ChatContext)     

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
  },[])

  /* funcion para manejar la apertura y cierre del accordion */
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex )    
  }

  let indexOfLastPermision = currentPage * documentsPerPage;
  let indexOfFirstPermision = indexOfLastPermision - documentsPerPage;
  let currentPermisions = perms.slice(indexOfFirstPermision, indexOfLastPermision);
  let totalPages = Math.ceil(permsShared.length / documentsPerPage) 

  const handlePaginationChange =  (e, activePage  ) => {
    SetCurrentPage( activePage.activePage );
    indexOfLastPermision = currentPage * documentsPerPage;
    indexOfFirstPermision = indexOfLastPermision - documentsPerPage;
    currentPermisions = perms.slice(indexOfFirstPermision, indexOfLastPermision);
  }
  /* var permisos = new Array(perms.length);
  if (perms.length > 0 && docs.length > 0) {
  docs.forEach((doc, doc_index) =>{
  perms.forEach((perm, perm_index) => {
    if(oauth2IsAuthenticated && oauth2Users._id === perm.withPermisions._id && oauth2Users._id !== perm.document.document_user && perm.requestAcepted === true && perm.document._id === doc._id) {
    permisos[perm_index] = perm;
    }
  })
})
}

  var versiones 
  var last = new Array(permisos.length);
  if (docs_version.length > 0) {
    permisos.forEach((perm, perm_index) => {
      versiones = new Array(); 
    docs_version.forEach((vers, vers_index) => {    
      if(perm.document._id === vers.document._id){
      versiones[vers_index] = vers;
      }
    }) 
    last[perm_index] = versiones[versiones.length-1];
  })  
}  */

  return (
    permsShared.length > 0 && permsShared[0] !== null ?
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
        <Grid columns={6} columns='equal' divided>
          <Grid.Row>
            <h2>Biblioteca Compartida</h2>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              Articulo
            </Grid.Column>
            <Grid.Column>
              Comentario
            </Grid.Column>
            <Grid.Column>
              Usuario
            </Grid.Column>
            <Grid.Column>
              Fecha
            </Grid.Column>
            <Grid.Column>
              Opciones
            </Grid.Column>
          </Grid.Row> 
          <div style={{overflowY:'scroll', maxHeight:400}}>
          {
        //docs.map(doc =>  
        currentPermisions.map(perm => 
          /*  oauth2IsAuthenticated && oauth2Users._id === perm.withPermisions._id && oauth2Users._id !== perm.document.document_user && perm.requestAcepted === true && perm.document._id === doc._id ?   */
          
            /**
            ACCORDION FOR MAIN DOCUMENT
             */
        <Fragment>
        <Grid.Row key={perm._id}>
          <Accordion fluid styled >
             <Accordion.Title
               active={activeIndex === perm._id}
               index={perm._id}
               onClick={handleClick}
             >
             {lastShared.map(last_version => 
              //last_version && perm.document._id === last_version.document._id ?
                <Grid columns={6} columns='equal' divided key={last_version._id}>
                  <Grid.Row color='blue'>
                      <Grid.Column><Icon name='dropdown'/>{perm.document.name}</Grid.Column>
                      <Grid.Column>{last_version.coment}</Grid.Column>
                      <Grid.Column>{last_version.document_user.name}</Grid.Column>
                      <Grid.Column>
                        <Moment fromNow>{last_version.document.createdAt}</Moment></Grid.Column>
                      <Grid.Column> 
                        <DocumentsOptions document={perm.document._id}/>
                      </Grid.Column>
                  </Grid.Row>  
                </Grid>   
             // :null
            )}
            </Accordion.Title>

            {/**
             ACCORDION FOR DOCUMENTS VERSIONS 
            */}
            <Accordion.Content active={activeIndex === perm._id}>
              {docs_version.length > 0 ?
                docs_version.map(doc_version => 
                docs_version && perm.document._id === doc_version.document._id ?
                  <Fragment key={doc_version._id}>
                    <Grid columns={6} columns='equal' celled>
                      <Grid.Row color='teal'>
                         <Grid.Column>{doc_version.document.name}</Grid.Column>
                         <Grid.Column>{doc_version.coment}</Grid.Column>
                         <Grid.Column>{doc_version.document_user.name}</Grid.Column>
                         <Grid.Column><Moment fromNow>{doc_version.createdAt}</Moment></Grid.Column>
                         <Grid.Column>
                         <Icon.Group size='large'>
                         <Icon name='eye' color='red' size='small' circular inverted/>
                         </Icon.Group>
                         </Grid.Column>
                       </Grid.Row>
                    </Grid>
                   </Fragment>
              : null)
            :null}
            </Accordion.Content>
          </Accordion>
          </Grid.Row>
          <Divider hidden />
          </Fragment>
             // :null
             ) 
         // )
              }
          </div>
          </Grid>  

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