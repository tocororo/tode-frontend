import React, {Fragment, useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Accordion, Icon, Container,  Segment, Header, Grid, Transition, Dimmer, Loader, Divider, Pagination} from 'semantic-ui-react'
import Moment  from 'react-moment'
import styled from 'styled-components'

import DocumentsOptions from './DocumentsOptions'
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocuments } from '../../actions/DocumentAction'
import { getChatNumber } from '../../actions/MessageAction'
import Confirm from '../Notifications/Confirm';

const MyLink = styled(Link)`
  &&& {
    background-color:#1d314d;
  }
`

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

function Documentos () {
  /* creando variables de estado y un metodo para modificarlas */
  const [activeIndex, setActiveIndex] = useState('');  
  const [showLoader, setShowLoader] = useState(true);
  const [showDocuments, setShowDocuments] = useState(false);
  const [currentPage, SetCurrentPage] = useState(1);
  const [documentsPerPage] = useState(5);
  

  /* utilizando variables de los reducers.js */
  const {docs_version, last} = useSelector(state => state.doc_version);
  const {docs, perms} = useSelector(state => state.doc);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch() 

  let permisos = new Array()
  for (let i = 0; i < perms.length; i++) {
   if (perms[i]) {
     permisos.push(perms[i])
   }   
  }

  let lastVersions = new Array()
  for (let i = 0; i < last.length; i++) {
   if (last[i]) {
    lastVersions.push(last[i])
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
    currentPermisions = perms.slice(indexOfFirstPermision, indexOfLastPermision);
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
  },[docs.length, docs_version.length])
  
  const chatNumber = (e, {document}) => {
    dispatch(getChatNumber({document}))
  }

  /* funcion para manejar la apertura y cierre del Myaccordion */
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex )
  }
  

  return (
    currentPermisions.length > 0 ?
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
          <MyGrid columns={6} columns='equal' divided padded >
            <MyGrid.Row>
              <h2>Mi Biblioteca</h2>
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
          currentPermisions.map((perm) => 
            /* oauth2IsAuthenticated && oauth2Users._id === perm.withPermisions._id && oauth2Users._id === perm.document.document_user ?  */
            
              /**
              MyACCORDION FOR MAIN DOCUMENT
               */          
          <Fragment key={perm._id}>
          <MyGrid.Row >
          <MyAccordion fluid  >
          <MyAccordion.Title
            active={activeIndex === perm._id}
            index={perm._id}
            onClick={handleClick}
          >
          {lastVersions.map(last_version => 
           last_version && perm.document._id === last_version.document._id ?
             <MyGrid columns={6} columns='equal' divided key={last_version._id}>
               <MyGrid.Row color='blue'>
                   <MyGrid.Column><Icon name='dropdown'/>{perm.document.name}</MyGrid.Column>
                   <MyGrid.Column>{last_version.coment}</MyGrid.Column>
                   <MyGrid.Column>{last_version.document_user.name}</MyGrid.Column>
                   <MyGrid.Column>
                     <Moment fromNow>{last_version.document.createdAt}</Moment></MyGrid.Column>
                   <MyGrid.Column> 
                     <DocumentsOptions document={perm.document._id} version={last_version._id}/>
                   </MyGrid.Column>
               </MyGrid.Row>  
             </MyGrid>   
           :null
         )}
         </MyAccordion.Title>

         {/**
          MyACCORDION FOR DOCUMENTS VERSIONS 
         */}
         <MyAccordion.Content active={activeIndex === perm._id}>
           {docs_version.length > 0 ?
            docs_version.map(doc_version => 
            doc_version && perm.document._id === doc_version.document._id ?
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
          :null
          }
          
         </MyAccordion.Content>
       </MyAccordion>
       </MyGrid.Row>
       <Divider hidden/>
       </Fragment>
          /* :null */
          // )
         ) 
           }
       </div>
        </MyGrid>   
        
        {/* LLamando al componente con el mensaje de cofirmacion del documento creado */}
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
        <Header icon>
          <Icon name='pdf file outline' />
          No existen documentos en la biblioteca.
        </Header>
        <MyLink className='button'  to='/new_document' >Adicionar Documento</MyLink>
      </Segment>
      </div>
  )
}

export default Documentos