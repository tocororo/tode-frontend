import React, {Fragment, useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Accordion, Icon, Container,  Segment, Header, Grid, Transition, Dimmer, Loader, Divider} from 'semantic-ui-react'
import Moment  from 'react-moment'
import styled from 'styled-components'

import DocumentsOptions from './DocumentsOptions'
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocuments } from '../../actions/DocumentAction'
import Confirm from '../Notifications/Confirm';
import { ChatContext } from '../contexts/ChatContext';

const MyLink = styled(Link)`
  &&& {
    background-color:#1d314d;
  }
`

function Documentos () {
  /* creando variables de estado y un metodo para modificarlas */
  const [activeIndex, setActiveIndex] = useState('');  
  const [showLoader, setShowLoader] = useState(true);
  const [showDocuments, setShowDocuments] = useState(false);
  

  /* utilizando variables de los reducers.js */
  const {docs_version} = useSelector(state => state.doc_version);
  const {docs, perms} = useSelector(state => state.doc);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()
  const {showIcon} = useContext(ChatContext)     

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
  },[docs.length, docs_version.length])
  

  /* funcion para manejar la apertura y cierre del accordion */
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex )
  }

  var permisos = new Array(perms.length);
  if (perms.length > 0) {
  perms.forEach((perm, index) => {
    if(oauth2IsAuthenticated && oauth2Users._id === perm.withPermisions._id && oauth2Users._id === perm.document.document_user) {
    permisos[index] = perm;
    }
  });
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
}  

  return (
    permisos.length > 0 ?
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
          <Grid columns={6} columns='equal' divided padded >
            <Grid.Row>
              <h2>Mi Biblioteca</h2>
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
          permisos.map((perm) => 
            /* oauth2IsAuthenticated && oauth2Users._id === perm.withPermisions._id && oauth2Users._id === perm.document.document_user ?  */
            
              /**
              ACCORDION FOR MAIN DOCUMENT
               */
          <Fragment>
          <Grid.Row key={perm._id}>
          <Accordion fluid  >
          <Accordion.Title
            active={activeIndex === perm._id}
            index={perm._id}
            onClick={handleClick}
          >
          {last.map(last_version => 
           last_version && perm.document._id === last_version.document._id ?
             <Grid columns={6} columns='equal' divided key={last_version._id}>
               <Grid.Row color='blue'>
                   <Grid.Column><Icon name='dropdown'/>{perm.document.name}</Grid.Column>
                   <Grid.Column>{last_version.coment}</Grid.Column>
                   <Grid.Column>{last_version.document_user.name}</Grid.Column>
                   <Grid.Column>
                     <Moment fromNow>{last_version.document.createdAt}</Moment></Grid.Column>
                   <Grid.Column> 
                     <Grid columns={2} >
                     <Grid.Row>
                     <Grid.Column>
                     <DocumentsOptions document={perm.document._id}/>
                     </Grid.Column>
                     <Grid.Column>
                     <Link
                          to={"/edit_document_version/" + last_version._id}>
                          <Icon name='write' color='red' size='large' onClick={showIcon}
                          />
                        </Link> 
                     </Grid.Column>
                     </Grid.Row>
                     </Grid>
                   </Grid.Column>
               </Grid.Row>  
             </Grid>   
           :null
         )}
         </Accordion.Title>

         {/**
          ACCORDION FOR DOCUMENTS VERSIONS 
         */}
         <Accordion.Content active={activeIndex === perm._id}>
           {docs_version.length > 0 ?
            docs_version.map(doc_version => 
            doc_version && perm.document._id === doc_version.document._id ?
               <Fragment key={doc_version._id}>
                 <Grid columns={6} columns='equal' celled>
                   <Grid.Row color='teal'>
                      <Grid.Column>{doc_version.document.name}</Grid.Column>
                      <Grid.Column>{doc_version.coment}</Grid.Column>
                      <Grid.Column>{doc_version.document_user.name}</Grid.Column>
                      <Grid.Column><Moment fromNow>{doc_version.createdAt}</Moment></Grid.Column>
                      <Grid.Column>
                        {/* <Link
                          to={"/edit_document_version/" + doc_version._id}>
                          <Icon name='pen square' color='orange' size='big'
                          onClick={falseDisabled}
                          />
                        </Link> */}
                      </Grid.Column>
                    </Grid.Row>
                 </Grid>
                </Fragment>
           : null)
          :null
          }
          
         </Accordion.Content>
       </Accordion>
       </Grid.Row>
       <Divider hidden/>
       </Fragment>
          /* :null */
          // )
       )
           }
       </div>
        </Grid>   
        
        {/* LLamando al componente con el mensaje de cofirmacion del documento creado */}
        <Confirm />
      </Transition.Group>
      </Transition> 
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